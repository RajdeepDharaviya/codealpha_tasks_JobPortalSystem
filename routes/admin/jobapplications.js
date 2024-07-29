const express = require("express");
const { middlewareOrg } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { responseCode } = require("../../config");
const applicationRoute = express.Router();

applicationRoute.use(middlewareOrg);

// This is the route for getting jobs application for particular job
/* ************** http://localhost:3000/admin/applications ***************** */
applicationRoute.get("/", async (req, res) => {
  const body = req.body;

  const appications = await prisma.totalApplications.findMany({
    where: {
      job_id: body.job_id,
    },
    select: {
      users: {
        select: {
          firstname: true,
          lastname: true,
          middlename: true,
          contact: true,
          email: true,
          age: true,
        },
      },
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

// This is the route for getting  selected job application for particular job
/* ************** http://localhost:3000/admin/applications/selected ***************** */
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

// This is the route for selecting job applications for particular job
/* ************** http://localhost:3000/admin/applications/selectApplication ***************** */
applicationRoute.post("/selectApplication", async (req, res) => {
  const body = req.body;

  const selectedApplication = await prisma.selectedApplication.create({
    data: {
      job_id: body.job_id,
      user_id: body.user_id,
    },
  });

  const approvedStatus = await prisma.applicationStatus.updateMany({
    where: {
      user_id: body.user_id,
      job_id: body.job_id,
    },
    data: {
      currentStatus: "approved",
    },
  });

  if (selectedApplication != null && approvedStatus != null) {
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

// This is the route for rejecting job applications for particular job
/* ************** http://localhost:3000/admin/applications/rejectApplication ***************** */
applicationRoute.post("/rejectApplication", async (req, res) => {
  const body = req.body;

  const approvedStatus = await prisma.applicationStatus.updateMany({
    where: {
      user_id: body.user_id,
      job_id: body.job_id,
    },
    data: {
      currentStatus: "rejected",
    },
  });

  if (approvedStatus != null) {
    res.status(responseCode.Success).json({
      message: "jobs applications of rejected users",
      approvedStatus: approvedStatus,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

// This is the route for remove applications for particular job
/* ************** http://localhost:3000/admin/applications/removeApplication ***************** */
applicationRoute.delete("/removeApplication", async (req, res) => {
  const body = req.body;

  const removeApplication = await prisma.selectedApplication.delete({
    where: {
      id: body.id,
    },
    select: {
      job_id: true,
      user_id: true,
    },
  });

  if (removeApplication != null) {
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
