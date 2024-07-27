const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { middleware, middlewareOrg } = require("../../middleware/middleware");
const { responseCode } = require("../../config");
const prfRoute = express.Router();
const prisma = new PrismaClient();

prfRoute.use(middlewareOrg);

prfRoute.get("/", async (req, res) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      firstname: true,
      lastname: true,
      middlename: true,
      contact: true,
      password: true,
      email: true,
      company_name: true,
      role: true,
    },
  });

  if (admin != null) {
    res.status(responseCode.Success).json({
      message: "admin Profile",
      admin: admin,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

prfRoute.post("/update", async (req, res) => {
  const body = req.body;

  const admin = await prisma.admin.update({
    where: {
      id: req.userId,
    },
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      middlename: body.middlename,
      contact: body.contact,
      password: body.password,
    },
  });

  if (admin != null) {
    res.status(responseCode.Success).json({
      message: "admin Profile",
      admin: admin,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

module.exports = { prfRoute };
