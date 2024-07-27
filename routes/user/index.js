const express = require("express");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const userRoute = express.Router();

userRoute.use("/signin", signinRoute);
userRoute.use("/signup", signupRoute);
module.exports = { userRoute };
