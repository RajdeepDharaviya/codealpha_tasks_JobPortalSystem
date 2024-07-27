const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const middleware = async (req, res, next) => {
  const authorize = req.headers.authorization;
  const data = authorize.split(" ");
  if (authorize && data[0] == "Bearer") {
    const Info = jwt.verify(data[1], "mySecret");
    console.log(Info);
    const verified = await prisma.users.findUnique({
      where: {
        email: Info.email,
      },
    });

    if (verified != []) {
      req.userId = Info.UserId;
      console.log(Info.userId);
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
    console.log(Info.AdminId);
    if (verified != []) {
      req.userId = Info.AdminId;
      console.log("id" + req.userId);
      next();
    }
  } else {
    res.send("Not authorized!");
  }
};

module.exports = { middleware, middlewareOrg };
