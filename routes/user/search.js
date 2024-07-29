const express = require("express");
const { middleware } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const searchRoute = express.Router();
const prisma = new PrismaClient();

searchRoute.use(middleware);

// This is the route for searching job
/* ************** http://localhost:3000/user/search ***************** */
searchRoute.get("/", async (req, res) => {
  const body = req.body;

  const searchResult = await prisma.jobs.findMany({
    where: {
      title: { startsWith: body.title },
    },
  });

  if (searchResult != null) {
    res.status(responseCode.Success).json({
      message: "Searched Jobs",
      searchResult: searchResult,
    });
  } else {
    res.status(responseCode.InternalServerError).send("No result");
  }
});

module.exports = { searchRoute };
