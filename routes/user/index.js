const express = require("express");
const { signinRoute } = require("./signin");
const { signupRoute } = require("./signup");
const { prfRoute } = require("./profile");
const { searchRoute } = require("./search");
const { applicationRoute } = require("./jobapplications");
const { jobsRoute } = require("./jobs");
const { skillRoute } = require("./skills");
const { commentRoute } = require("./comments");
const { statusRoute } = require("./applicationStatus");
const userRoute = express.Router();

userRoute.use("/signin", signinRoute);
userRoute.use("/signup", signupRoute);
userRoute.use("/profile", prfRoute);
userRoute.use("/search", searchRoute);
userRoute.use("/applications", applicationRoute);
userRoute.use("/jobs", jobsRoute);
userRoute.use("/skills", skillRoute);
userRoute.use("/comments", commentRoute);
userRoute.use("/status", statusRoute);

module.exports = { userRoute };
