const express = require("express");
const path = require("path");
const User = require('../model/model'); // Ensure you have the correct path to the User model
const router = express.Router();
const multer = require("multer");
const ErrorHandler = require("../utills/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

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
    res.send("Hamza Ashraf KHOKHAR");
});

router.post("/create-user", upload.single('avatar'), async (req, res, next) => {
    const { name, email, password ,avatar} = req.body;
    try {
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            const filename=req.file.filename;
            const filePath=`uploads/${filename}`;
            
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

//login
router.post('/login-user', catchAsyncError(async (req, resp, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("please provide all fields", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("user does not exist", 400));
        }

        const isPasswordValid = await user.comparePassword(password);   

        if (!isPasswordValid) {
            return next(new ErrorHandler("please provide the correct information", 400));
        }

        // Continue with the login process (e.g., generating a token, etc.)
        // For example:
        // const token = user.generateAuthToken();
        // resp.status(200).json({ success: true, token });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// router.get('/getuser',catchAsyncError(async(req,res,next)=>{
//     try {
//         const user= await User.findById(req.user.id);

//         if(!user){
//             return next(new ErrorHandler("User doesn't exist  "))
//         }

//         res.status(200).json({
//             success:true,
//             user
//         })
//     } catch(error) {
//         return next(new ErrorHandler(error.message,500))
//     }
// }))
router.get('/getuser', catchAsyncError(async(req, res, next) => {
    try {
        if (!req.user) {
            return next(new ErrorHandler("User not authenticated", 401));
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new ErrorHandler("User doesn't exist", 404));
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));


// router.get("/logout",
//     catchAsyncErrors(async (req, res, next) => {
//       try {
//         res.cookie("token", null, {
//           expires: new Date(Date.now()),
//           httpOnly: true,
//           sameSite: "none",
//           secure: true,
//         });
//         res.status(201).json({
//           success: true,
//           message: "Log out successful!",
//         });
//       } catch (error) {
//         return next(new ErrorHandler(error.message, 500));
//       }
//     })
//   );
  


module.exports = router;
