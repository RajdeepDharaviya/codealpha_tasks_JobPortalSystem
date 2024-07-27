const express = require("express");
const signupRoute = express.Router();
const { responseCode } = require("../../config");
const md5 = require("md5");
const { adminsignupSchema } = require("../../middleware/validation");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Route for Signup is
/* ************** "http://localhost:3000/admin/signup" ***************/
signupRoute.post("/", async (req, res) => {
  // Getting data from the admin
  const body = req.body;
  console.log(body);
  console.log(adminsignupSchema.safeParse(body).success);
  if (adminsignupSchema.safeParse(body).success) {
    // Inserting data into the database
    const admin = await prisma.admin.create({
      data: {
        firstname: body.firstname,
        middlename: body.middlename,
        lastname: body.lastname,
        email: body.email,
        password: md5(body.password),
        contact: body.contact,
        age: body.age,
        role: body.role,
        company_name: body.company_name,
      },
    });
    console.log(typeof admin);
    console.log(admin);
    // give response to the admin
    if (admin != null) {
      res.status(responseCode.Success).json({
        message: "done",
        admin: admin,
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
