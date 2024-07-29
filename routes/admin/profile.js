const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { middleware, middlewareOrg } = require("../../middleware/middleware");
const { responseCode } = require("../../config");
const md5 = require("md5");
const prfRoute = express.Router();
const prisma = new PrismaClient();

prfRoute.use(middlewareOrg);

// This is the route for getting user profile
/* ************** http://localhost:3000/admin/profile/ ***************** */
prfRoute.get("/", async (req, res) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: req.userId,
      isAct: true,
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

// This is the route for editing user profile
/* ************** http://localhost:3000/admin/profile/add ***************** */
prfRoute.put("/update", async (req, res) => {
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
      password: md5(body.password),
      role: body.role,
      company_name: body.company_name,
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

// This is the route for deactive user account
/* ************** http://localhost:3000/admin/profile/deactive ***************** */
prfRoute.put("/deactive", async (req, res) => {
  const body = req.body;

  const admin = await prisma.admin.update({
    where: {
      id: req.userId,
    },
    data: {
      isAct: false,
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
