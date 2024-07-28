const express = require("express");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const { prfRoute } = require("./profile");
const { applicationRoute } = require("./jobapplications");
const { jobsRoute } = require("./jobs");
const { commentRoute } = require("./comments");
const adminRoute = express.Router();

adminRoute.use("/signin", signinRoute);
adminRoute.use("/signup", signupRoute);
adminRoute.use("/profile", prfRoute);
adminRoute.use("/application", applicationRoute);
adminRoute.use("/jobs", jobsRoute);
adminRoute.use("/comments", commentRoute);

module.exports = { adminRoute };
