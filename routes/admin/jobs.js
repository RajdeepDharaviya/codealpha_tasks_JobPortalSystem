const express = require("express");
const { middlewareOrg } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jobsRoute = express.Router();

jobsRoute.use(middlewareOrg);

jobsRoute.get("/", async (req, res) => {
  const jobs = await prisma.jobs.findMany({
    where: {
      admin_id: req.userId,
    },
    select: {
      title: true,
      description: true,
      jobTime: true,
      role: true,
      salaryRange: true,
      JobType: true,
    },
  });

  if (jobs != null) {
    res.status(responseCode.Success).json({
      message: "Posted Jobs",
      jobs: jobs,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

jobsRoute.post("/add", async (req, res) => {
  const body = req.body;

  const job = await prisma.jobs.create({
    data: {
      title: body.title,
      description: body.description,
      jobTime: body.jobTime,
      admin_id: req.userId,
      role: body.role,
      salaryRange: body.salaryRange,
      JobType: {
        create: {
          Type: body.type,
        },
      },
    },
  });

  if (job != null) {
    res.status(responseCode.Success).json({
      message: "Your job posted created successfully",
      job: job,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

module.exports = { jobsRoute };
