import bcrypt from "bcryptjs";
import { request, response } from "express";
import db from "../../connector";
import { EmailVerifiedStatus } from "@prisma/client";
import { Role } from '@prisma/client';


async function createUser(req = request, res = response) {
  const { name, email, password, confirm_password } = req.body;

  if (/\d/.test(name)) {
    return res.status(400).json({ message: "Name tidak boleh mengandung angka" });
  }

  if (password != confirm_password ) {
    return res
    .status(400)
    .json({ message: "Password and confirm password do not match" })
  }
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    // validate username
    const exitstingEmail = await db.users.findFirst({
      where: {
        email: email,
      }
    });

    if(exitstingEmail) {
      return res.status(400).json({
        status: "error",
        message: "Username or email already exists"
      });
    }

    const response = await db.users.create({
      data: {
        name,
        email,
        password: hashPassword,
        confirm_password: hashPassword,
        email_verified: EmailVerifiedStatus.no,
        // role_id: findRole.name || 1
        role: Role.user
      }
    });

    res.status(201).json({
      status: "success",
      message: "Register Successfully",
      data: response
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}

async function createUserCompany(req = request, res = response) {
  const { name, email, password, confirm_password } = req.body;

  if (password != confirm_password ) {
      return res
      .status(400)
      .json({ message: "Password and confirm password do not match" })
    }
    const hashPassword = await bcrypt.hash(password, 10);
  
    try {
      // validate username
      const exitstingEmail = await db.users.findFirst({
        where: {
          email: email,
        }
      });
  
      if(exitstingEmail) {
        return res.status(400).json({
          status: "error",
          message: "Username or email already exists"
        });
      }
  
      const response = await db.users.create({
        data: {
          name,
          email,
          password: hashPassword,
          confirm_password: hashPassword,
          email_verified: EmailVerifiedStatus.no,
          // role_id: findRole.name || 1
          role: Role.company
        }
      });
  
      res.status(201).json({
        status: "success",
        message: "Register Successfully",
        data: response
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: error.message
      })
    }

}

export { createUser, createUserCompany };