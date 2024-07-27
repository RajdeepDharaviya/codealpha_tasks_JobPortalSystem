const zod = require("zod");

const adminsignupSchema = zod.object({
  firstname: zod.string(),
  middlename: zod.string(),
  lastname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(7),
  contact: zod
    .string()
    .min(10)
    .regex(/^\d{10}$/),
  age: zod.number(),
  role: zod.string(),
  company_name: zod.string(),
});

const usersignupSchema = zod.object({
  firstname: zod.string(),
  middlename: zod.string(),
  lastname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
  contact: zod
    .string()
    .min(10)
    .regex(/^\d{10}$/),
  age: zod.number(),
});

const signinSchema = zod.object({
  email: zod.string().email("Please Enter valid format for email"),
  password: zod.string().min(8, "Please enter atleast 8 digits"),
});

module.exports = { adminsignupSchema, usersignupSchema, signinSchema };
