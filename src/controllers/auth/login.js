import { request, response } from "express";
import jwt from "jsonwebtoken";
import db from "../../connector";
import bcrypt from "bcryptjs/dist/bcrypt";
import { Role } from "@prisma/client";

async function login(req = request, res = response) {
  try {
    const { email, password} = req.body
    const findUser = await db.users.findUnique({
      where: {
        email: email
      }
    });
    if (!findUser) {
      return res.status(400).json({
        status: "error",
        message: "Email not found",
      });
    }

    // password validation
    const validPassword = await bcrypt.compare(password, findUser.password);
    if (!validPassword) {
      return res.status(400).json({
        status: "error",
        message: "Password Invalid",
      });
    }

     // jwt
    const key = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userId: findUser.id }, key, { expiresIn: "1d" });
    res.status(200).json({
      status: "success",
      message: "Login Successfully",
      token: token,
      role: Role.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function loginCompany(req = request, res = response) {
  try {
    const { email, password} = req.body
    const findUser = await db.users.findUnique({
      where: {
        email: email,
        role: Role.company
      }
    });
    if (!findUser) {
      return res.status(400).json({
        status: "error",
        message: "Email not found or only ROLE Company",
      });
    }

    // password validation
    const validPassword = await bcrypt.compare(password, findUser.password);
    if (!validPassword) {
      return res.status(400).json({
        status: "error",
        message: "Password not match",
      });
    }

     // jwt
     const key = process.env.JWT_SECRET_KEY;
     const token = jwt.sign({ userId: findUser.id }, key, { expiresIn: "1d" });
     res.status(200).json({
       status: "success",
       message: "Login Successfully",
       token: token,
       role: Role.company,
     });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { login, loginCompany }