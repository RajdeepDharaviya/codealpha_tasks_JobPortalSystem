const express = require("express");
const { middleware } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const jobsRoute = express.Router();
const { responseCode } = require("../../config");
const prisma = new PrismaClient();

jobsRoute.use(middleware);

// This is the route for editing eligibilities criteria for particular job
/* ************** http://localhost:3000/user/jobs ***************** */
jobsRoute.get("/", async (req, res) => {
  const jobs = await prisma.jobs.findMany({
    where: {
      isAct: true,
    },
    select: {
      title: true,
      description: true,
      jobTime: true,
      JobType: {
        select: {
          Type: true,
        },
      },
      role: true,
      salaryRange: true,
      Eligblities: {
        select: {
          skills: true,
          ageLimit: true,
          gender: true,
          minimumExperience: true,
          minimumQaulification: true,
        },
      },
    },
  });
  console.log(jobs);

  if (jobs != null) {
    res.status(responseCode.Success).json({
      message: "Jobs that match your profile",
      jobs: jobs,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("something wrong with server , Please try again after sometime!");
  }
});

module.exports = { jobsRoute };
