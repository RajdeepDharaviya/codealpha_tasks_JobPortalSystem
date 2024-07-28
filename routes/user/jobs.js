const express = require("express");
const { middleware } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const jobsRoute = express.Router();
const prisma = new PrismaClient();

jobsRoute.use(middleware);

jobsRoute.get("/", async (req, res) => {
  const userSkills = await prisma.userProfile.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      skills: true,
    },
  });

  const jobs = await prisma.jobs.findMany({
    where: {
      isAct: true,
    },
    include: {
      Eligblities: {
        where: {
          skills: userSkills.skills.map((skill) => {
            return skill;
          }),
        },
      },
    },
  });

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

jobsRoute.get("/alljobs", async (req, res) => {
  const jobs = await prisma.jobs.findMany({
    where: {
      isAct: true,
    },
  });

  if (jobs != null) {
    res.status(responseCode.Success).json({
      message: "All Jobs",
      jobs: jobs,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("something wrong with server , Please try again after sometime!");
  }
});

module.exports = { jobsRoute };
