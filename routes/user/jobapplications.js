const express = require("express");
const { middleware } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const applicationRoute = express.Router();
const prisma = new PrismaClient();

applicationRoute.use(middleware);

// This is the route for editing eligibilities criteria for particular job
/* ************** http://localhost:3000/user/applications ***************** */
applicationRoute.get("/", async (req, res) => {
  const appliedJobs = await prisma.totalApplications.findMany({
    where: {
      user_id: req.userId,
    },
    include: {
      jobs: {
        select: {
          title: true,
          description: true,
          JobType: true,
          jobTime: true,
          role: true,
          salaryRange: true,
        },
      },
    },
  });

  if (appliedJobs != null) {
    res.status(responseCode.Success).json({
      message: "Applied Jobs",
      appliedJobs: appliedJobs,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("something wrong with server , Please try again after sometime!");
  }
});

// This is the route for editing eligibilities criteria for particular job
/* ************** http://localhost:3000/user/applications/apply ***************** */
applicationRoute.post("/apply", async (req, res) => {
  const body = req.body;

  const applyJob = await prisma.totalApplications.create({
    data: {
      job_id: body.job_id,
      user_id: req.userId,
    },
  });
  const applicationStatus = await prisma.applicationStatus.create({
    data: {
      currentStatus: "pending",
      job_id: body.job_id,
      user_id: req.userId,
    },
  });
  if (applyJob != null && applicationStatus != null) {
    res.status(responseCode.Success).json({
      message: "Applied for Jobs",
      applyJob: applyJob,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("something wrong with server , Please try again after sometime!");
  }
});

module.exports = { applicationRoute };
