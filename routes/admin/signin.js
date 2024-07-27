const express = require("express");
const signinRoute = express.Router();
const { responseCode } = require("../../config");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");
const md5 = require("md5");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { signinSchema } = require("../../middleware/validation");

// Route for Signin is
/* ************** "http://localhost:3000/admin/signin" ***************/
signinRoute.post("/", async (req, res) => {
  // Getting data from the Admin
  const body = req.body;

  if (signinSchema.safeParse(body).success) {
    // Inserting data into the database
    const Admin = await prisma.admin.findFirst({
      where: {
        email: body.email,
        password: md5(body.password),
      },
    });

    // give response to the Admin
    if (Admin != null) {
      const token = jwt.sign(
        {
          email: Admin.email,
          AdminId: Admin.id,
        },
        jwtSecret
      );
      res.status(responseCode.Success).json({
        message: "Sign in successfully!",
        token: "Bearer " + token,
      });
    } else {
      res
        .status(responseCode.InternalServerError)
        .send("Something wrong with server, please try again after sometime!");
    }
  } else {
    res.status(responseCode.NotValid).send(signinSchema.safeParse(body).error);
  }
});

module.exports = { signinRoute };
