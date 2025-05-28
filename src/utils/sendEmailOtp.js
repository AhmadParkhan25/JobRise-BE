import { Resend } from "resend";
import db from "../connector";
import { generate } from "otp-generator";
import { EmailVerifiedStatus } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';


const resend = new Resend(process.env.RESEND_API_KEY);

function generateOtp(){
  return generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
}

function otpExpiresAt() {
  return new Date(Date.now() + 5 * 60 * 1000); 
}

async function sendVerificationEmail(email, otp) {
  try {
    await resend.emails.send({
      from: 'JobRise <jobrise@hotelmarisrangkas.com>', // Replace with your domain
      to: email,
      subject: 'Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Your OTP for email verification is:</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 3px; margin: 20px 0; text-align: center; color: #007bff;">
            ${otp}
          </div>
          <p style="color: #666;">This OTP will expire in 5 minutes.</p>
          <p style="color: #999; font-size: 14px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log("✅ Email sent successfully!");

    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));
    return false;
  }
}


async function saveOtpToDatabase(userId, email, otp) {
  try {
    await db.otps.deleteMany({
      where: {
        userId: userId,
      },
    });

    // Create new OTP record
    const newOtp = await db.otps.create({
      data: {
        id: uuidv4(),
        userId: userId,
        email: email,
        otp: otp,
        createdAt: new Date(),
        updatedAt: new Date(),
        expiredAt: otpExpiresAt(),
      },
    });
    return newOtp;
  } catch (error) {
    console.error("Error saving OTP to database:", error);
    throw error;
  }
}


async function verificationOTP(userId, otp) {
  try {
    const otpRecord = await db.otps.findFirst({
      where: {
        userId: userId,
        otp: otp,
        expiredAt: {
          gte: new Date()
        }
      },
      select: {
        id: true,
      }
    });

    if (!otpRecord) {
      return { success: false, message: "Invalid or expired OTP" };
    }

    // update status
    await db.users.update({
      where: { id: userId },
      data: { email_verified: EmailVerifiedStatus.yes }
    });

    await db.otps.delete({
      where: { id: otpRecord.id }
    });

    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}


export {
  generateOtp,
  sendVerificationEmail,
  saveOtpToDatabase,
  verificationOTP
}