const express = require("express");
const path = require("path");
const User = require('../model/model'); // Ensure you have the correct path to the User model
const router = express.Router();
const multer = require("multer");
const ErrorHandler = require("../utills/ErrorHandler");

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.get("/test", (req, res) => {
    res.send("Hamza Ashraf");
});

router.post("/create-user", upload.single('avatar'), async (req, res, next) => {
    const { name, email, password,avatar } = req.body;
    try {
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return next(new ErrorHandler("User already exists", 400));
        }

        const filename = req.file ? req.file.filename : null;
        const fileUrl = filename ? path.join('uploads', filename) : null;

        const user = new User({
            name,
            email,
            password,
            avatar: fileUrl,
        });

        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error',
    });
});

module.exports = router;
