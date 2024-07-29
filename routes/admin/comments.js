const express = require("express");
const { middlewareOrg } = require("../../middleware/middleware");
const { PrismaClient } = require("@prisma/client");
const { responseCode } = require("../../config");
const prisma = new PrismaClient();
const commentRoute = express.Router();

commentRoute.use(middlewareOrg);

// This is the route for editing eligibilities criteria for particular job
/* ************** http://localhost:3000/admin/comments/jobs ***************** */
commentRoute.get("/jobs", async (req, res) => {
  const body = req.body;

  const comments = await prisma.comments.findMany({
    where: {
      job_id: body.job_id,
      isAct: true,
    },
  });

  if (comments != null) {
    res.status(responseCode.Success).json({
      message: "Posted Jobs",
      comments: comments,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

// This is the route for adding comments to job posts criteria for particular job
/* ************** http://localhost:3000/admin/comments/add ***************** */
commentRoute.post("/add", async (req, res) => {
  const body = req.body;

  const comments = await prisma.comments.create({
    data: {
      comment: body.comment,
      job_id: body.job_id,
      admin_id: req.userId,
    },
    select: {
      comment: true,
      job_id: true,
      admin_id: true,
    },
  });

  if (comments != null) {
    res.status(responseCode.Success).json({
      message: "Comment Posted",
      comments: comments,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

// This is the route for editing comments for particular job post
/* ************** http://localhost:3000/admin/comments/edit ***************** */
commentRoute.put("/edit", async (req, res) => {
  const body = req.body;

  const comments = await prisma.comments.update({
    where: {
      id: body.comment_id,
    },
    data: {
      comment: body.comment,
    },
  });

  if (comments != null) {
    res.status(responseCode.Success).json({
      message: "Comment Edited",
      comments: comments,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

// This is the route for delete comments  for particular job
/* ************** http://localhost:3000/admin/comments/delete ***************** */
commentRoute.delete("/delete", async (req, res) => {
  const body = req.body;

  const comments = await prisma.comments.update({
    where: {
      id: body.comment_id,
    },
    data: {
      isAct: false,
    },
  });

  if (comments != null) {
    res.status(responseCode.Success).json({
      message: "Comment Edited",
      comments: comments,
    });
  } else {
    res
      .status(responseCode.InternalServerError)
      .send("Something wrong with server ,Please try again after sometime");
  }
});

module.exports = { commentRoute };
