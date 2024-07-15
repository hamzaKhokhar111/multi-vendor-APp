const express = require("express");
// const ErrorHandler = require("./utills/ErrorHandler");
const app = express();
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./controller/user");
// const shop = require("./model/shop");

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from the frontend development server
    credentials: true,
}));
app.use(cookiesParser());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "back/config/.env"
    });
}

app.use("/api/v2/user", user);
// app.use("/api/v2/ax")
// app.use("/api/v2/shop", shop);

// app.use(ErrorHandler);

module.exports = app;
