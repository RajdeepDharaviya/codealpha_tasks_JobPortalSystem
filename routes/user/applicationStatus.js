const express = require("express");
const { middleware } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const prisma = new PrismaClient();
const statusRoute = express.Router();

statusRoute.use(middleware);

// This is the route for getting job application status
/* ************** http://localhost:3000/user/status/ ***************** */
statusRoute.get("/", async (req, res) => {
  const status = await prisma.applicationStatus.findMany({
    where: {
      user_id: req.user_id,
    },
    select: {
      appliedDate: true,
      currentStatus: true,
      jobs: {
        select: {
          title: true,
          description: true,
          salaryRange: true,
          jobTime: true,
          JobType: true,
        },
      },
    },
  });

  if (status != null) {
    res.status(responseCode.Success).json({
      message: "Job application status",
      status: status,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("something wrong with server , Please try again after sometime!");
  }
});

module.exports = { statusRoute };
