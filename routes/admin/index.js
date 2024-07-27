const express = require("express");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const { prfRoute } = require("./profile");
const adminRoute = express.Router();

adminRoute.use("/signin", signinRoute);
adminRoute.use("/signup", signupRoute);
adminRoute.use("/profile", prfRoute);

module.exports = { adminRoute };
