const express = require("express");
const signupRoute = express.Router();
const { responseCode } = require("../../config");
const md5 = require("md5");
const { usersignupSchema } = require("../../middleware/validation");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Route for Signup is
/* ************** "http://localhost:3000/user/signup" ***************/
signupRoute.post("/", async (req, res) => {
  // Getting data from the User
  const body = req.body;

  if (usersignupSchema.safeParse(body).success) {
    // Inserting data into the database
    const User = await prisma.users.create({
      data: {
        firstname: body.firstname,
        middlename: body.middlename,
        lastname: body.lastname,
        email: body.email,
        password: md5(body.password),
        contact: body.contact,
        age: body.age,
      },
    });

    // give response to the User
    if (User) {
      res.status(responseCode.Success).json({
        message: "Your account has created successfully!",
        data: User,
      });
    } else {
      res
        .status(responseCode.InternalServerError)
        .send("Something wrong with server, please try again after sometime!");
    }
  } else {
    res.status(responseCode.NotValid).send("Please provid valid credetials!");
  }
});

module.exports = { signupRoute };
