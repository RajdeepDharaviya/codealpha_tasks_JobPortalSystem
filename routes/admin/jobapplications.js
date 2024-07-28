const express = require("express");
const { middlewareOrg } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const applicationRoute = express.Router();

applicationRoute.use(middlewareOrg);

applicationRoute.get("/", async (req, res) => {
  const body = req.body;

  const appications = await prisma.totalApplications.findMany({
    where: {
      job_id: body.job_id,
    },
    select: {
      users: true,
      jobs: true,
    },
  });

  if (appications != null) {
    res.status(responseCode.Success).json({
      message: "jobs applications by users",
      appications: appications,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

applicationRoute.get("/selected", async (req, res) => {
  const body = req.body;

  const appications = await prisma.selectedApplication.findMany({
    where: {
      job_id: body.job_id,
    },
    select: {
      users: true,
      jobs: true,
    },
  });

  if (appications != null) {
    res.status(responseCode.Success).json({
      message: "jobs applications by users",
      appications: appications,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

applicationRoute.post("/add", async (req, res) => {
  const body = req.body;

  const selectedApplication = await prisma.selectedApplication.create({
    data: {
      job_id: body.job_id,
      user_id: body.user_id,
    },
  });

  if (selectedApplication != null) {
    res.status(responseCode.Success).json({
      message: "jobs applications of selected users",
      selectedApplication: selectedApplication,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

applicationRoute.post("/remove", async (req, res) => {
  const body = req.body;

  const removeApplication = await prisma.selectedApplication.update({
    where: {
      id: body.id,
    },
    data: {
      job_id: body.job_id,
      user_id: body.user_id,
    },
  });

  if (selectedApplication != null) {
    res.status(responseCode.Success).json({
      message: "jobs applications of remove user",
      removeApplication: removeApplication,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

module.exports = { applicationRoute };
