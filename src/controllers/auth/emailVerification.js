import { request, response } from "express";
import db from "../../connector";
import {
  generateOtp,
  sendVerificationEmail,
  saveOtpToDatabase,
  verificationOTP
} from "../../utils/sendEmailOtp";
import { EmailVerifiedStatus } from "@prisma/client";


async function sendOTP(req = request, res = response) {
  const userId = req.userId;

  try {
    const findUser = await db.users.findUnique({
      where: {
        id: userId
      },
      select: {
        email: true,
        email_verified: true,
      }
    });

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (findUser.email_verified === EmailVerifiedStatus.yes) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified"
      });
    }

    // generate OTP
    const otp = generateOtp();
    const otpSave = await saveOtpToDatabase(userId, findUser.email, otp);

    if (!otpSave) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate and save OTP"
      });
    }

    const emailSent = await sendVerificationEmail(findUser.email, otp);
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email"
      });
    }

    res.status(200).json({
      status: "success",
      message: "OTP sent successfully to your email",
      data: {
        email: findUser.email,
        expiresIn: "5 minutes"
      }
    });
  } catch (error) {
    console.error("Error in sendOTP:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}


async function verifyOTP(req = request, res = response) {
  const userId = req.userId;
  const { otp } = req.body;

  try {
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required"
      });
    }

    // Validate OTP 6 digit string
    // TODO

    const findUser = await db.users.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        email: true,
        email_verified: true,
      }
    });

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (findUser.email_verified === EmailVerifiedStatus.yes) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified"
      });
    }

    // verif otp
    const verificationResult = await verificationOTP(userId, otp);

    if (!verificationResult.success) {
      return res.status(400).json({
        success: false,
        message: verificationResult.message
      });
    }

    res.status(200).json({
      success: true,
      message: verificationResult.message,
      data: {
        email: findUser.email,
        verified: true
      }
    });

  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}

export { sendOTP, verifyOTP }