const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const middleware = async (req, res, next) => {
  const authorize = req.headers.authorization;
  const data = authorize.split(" ");
  if (authorize && data[0] == "Bearer") {
    const Info = jwt.verify(data[1], "mySecret");

    const verified = await prisma.users.findUnique({
      where: {
        email: Info.email,
      },
    });

    if (verified != []) {
      req.userId = Info.UserId;

      next();
    }
  } else {
    res.send("Not authorized!");
  }
};

const middlewareOrg = async (req, res, next) => {
  const authorize = req.headers.authorization;
  const data = authorize.split(" ");
  if (authorize && data[0] == "Bearer") {
    const Info = jwt.verify(data[1], "mySecret");

    const verified = await prisma.admin.findUnique({
      where: {
        email: Info.email,
      },
    });

    if (verified != []) {
      req.userId = Info.AdminId;

      next();
    }
  } else {
    res.send("Not authorized!");
  }
};

module.exports = { middleware, middlewareOrg };
