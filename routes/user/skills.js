const express = require("express");
const { middleware } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const skillRoute = express.Router();
const prisma = new PrismaClient();

skillRoute.use(middleware);

skillRoute.get("/", async (req, res) => {
  const skills = await prisma.userProfile.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      skills: true,
      experience: true,
      last_job: true,
      qualification: true,
    },
  });

  if (skills != null) {
    res.status(responseCode.Success).json({
      message: "Your Skills ",
      skills: skills,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("something wrong with server , Please try again after sometime!");
  }
});

skillRoute.post("/add", async (req, res) => {
  const body = req.body;
  const skills = await prisma.userProfile.create({
    data: {
      experience: body.experience,
      skills: body.skills,
      qualification: body.qualification,
      last_job: body.last_job,
      id: req.userId,
    },
  });

  if (skills != null) {
    res.status(responseCode.Success).json({
      message: "Your Skills ",
      skills: skills,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("something wrong with server , Please try again after sometime!");
  }
});

skillRoute.put("/edit", async (req, res) => {
  const body = req.body;
  const skills = await prisma.userProfile.update({
    where: {
      id: req.userId,
    },
    data: {
      experience: body.experience,
      skills: body.skills,
      qualification: body.qualification,
      last_job: body.last_job,
    },
  });

  if (skills != null) {
    res.status(responseCode.Success).json({
      message: "Your Skills ",
      skills: skills,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("something wrong with server , Please try again after sometime!");
  }
});

module.exports = { skillRoute };
