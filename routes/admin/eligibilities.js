const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { middlewareOrg } = require("../../middleware/middleware");
const { responseCode } = require("../../config");
const prisma = new PrismaClient();
const elgRoute = express.Router();

elgRoute.use(middlewareOrg);

// This is the route for getting all eligibilities for job
/* ************** http://localhost:3000/admin/eligibilities/ ***************** */
elgRoute.get("/", async (req, res) => {
  const body = req.body;
  const eligibilities = await prisma.eligblities.findMany({
    where: {
      job_id: body.job_id,
    },
    select: {
      ageLimit: true,
      gender: true,
      minimumExperience: true,
      minimumQaulification: true,
      skills: true,
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

// This is the route for adding eligibilities for particular job
/* ************** http://localhost:3000/admin/eligibilities/add ***************** */
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

// This is the route for editing eligibilities criteria for particular job
/* ************** http://localhost:3000/admin/eligibilities/edit ***************** */
elgRoute.put("/edit", async (req, res) => {
  const body = req.body;

  const eligibilities = await prisma.eligblities.updateMany({
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
