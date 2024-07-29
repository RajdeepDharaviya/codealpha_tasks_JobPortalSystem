const express = require("express");
const { middleware } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const searchRoute = express.Router();
const prisma = new PrismaClient();

searchRoute.use(middleware);

searchRoute.get("/", async (req, res) => {
  const body = req.body;

  const searchResult = await prisma.jobs.findMany({
    where: {
      OR: [
        { title: { contains: body.title } },
        {
          description: { contains: body.description },
        },
      ],
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
