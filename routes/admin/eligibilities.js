const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const elgRoute = express.Router();

elgRoute.use(middlewareOrg);

elgRoute.get("/", async (req, res) => {
  const body = req.body;

  const eligibilities = await prisma.eligblities.findUnique({
    where: {
      job_id: body.job_id,
    },
    select: {
      ageLimit: true,
      gender: true,
      minimumExperience: true,
      minimumQaulification: true,
    },
  });
  if (eligibilities != null) {
    res.status(responseCode.Success).json({
      message: "Eligibilities are added successfully",
      eligibilities: eligibilities,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

elgRoute.post("/add", async (req, res) => {
  const body = req.body;

  const eligibilities = await prisma.eligblities.create({
    data: {
      job_id: body.job_id,
      minimumExperience: body.minimumExperience,
      minimumQaulification: body.minimumQaulification,
      ageLimit: body.ageLimit,
      gender: body.gender,
      skills: body.skills,
    },
  });
  if (eligibilities != null) {
    res.status(responseCode.Success).json({
      message: "Eligibilities are added successfully",
      eligibilities: eligibilities,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

elgRoute.put("/edit", async (req, res) => {
  const body = req.body;

  const eligibilities = await prisma.eligblities.update({
    where: {
      job_id: body.job_id,
    },
    data: {
      minimumExperience: body.minimumExperience,
      minimumQaulification: body.minimumQaulification,
      ageLimit: body.ageLimit,
      gender: body.gender,
      skills: body.skills,
    },
  });
  if (eligibilities != null) {
    res.status(responseCode.Success).json({
      message: "Eligibilities are added successfully",
      eligibilities: eligibilities,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

module.exports = { elgRoute };
