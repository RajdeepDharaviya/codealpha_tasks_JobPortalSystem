const express = require("express");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const { prfRoute } = require("./profile");
const userRoute = express.Router();

userRoute.use("/signin", signinRoute);
userRoute.use("/signup", signupRoute);
userRoute.use("/profile", prfRoute);

module.exports = { userRoute };
