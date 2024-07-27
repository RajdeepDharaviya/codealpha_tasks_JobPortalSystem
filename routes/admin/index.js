const express = require("express");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const adminRoute = express.Router();

adminRoute.use("/signin", signinRoute);
adminRoute.use("/signup", signupRoute);

module.exports = { adminRoute };
