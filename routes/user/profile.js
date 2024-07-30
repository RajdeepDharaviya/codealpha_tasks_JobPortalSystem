const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { middleware } = require("../../middleware/middleware");
const { responseCode } = require("../../config");
const md5 = require("md5");
const multer = require("multer");
const prfRoute = express.Router();
const prisma = new PrismaClient();
const upload = multer({ storage: multer.memoryStorage() });

prfRoute.use(middleware);

prfRoute.get("/", async (req, res) => {
  const user = await prisma.users.findUnique({
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
    },
  });

  if (user != null) {
    res.status(responseCode.Success).json({
      message: "User Profile",
      user: user,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

prfRoute.post("/update", async (req, res) => {
  const body = req.body;

  const user = await prisma.users.update({
    where: {
      id: req.userId,
    },
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      middlename: body.middlename,
      contact: body.contact,
      password: md5(body.password),
    },
  });

  if (user != null) {
    res.status(responseCode.Success).json({
      message: "User Profile",
      user: user,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

prfRoute.post("/addResume", upload.single("file"), async (req, res) => {
  const { file } = req;

  if (file) {
    const resume = await prisma.resumes.create({
      data: {
        user_id: req.userId,
        resume: file.buffer,
      },
    });

    if (resume != null) {
      res.status(responseCode.Success).json({
        message: "Resume added",
        resume: resume,
      });
    } else {
      res
        .status(responseCode.InternalServerError)
        .send("Something wrong with server ,Please try again after sometime");
    }
  }
});

module.exports = { prfRoute };
