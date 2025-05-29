import { request, response } from "express";
import db from "../../connector";
import { generateResetToken, sendForgotEmail } from "../../utils/sendForgetPw";
import bcrypt from "bcryptjs/dist/bcrypt";


async function forgetPassword(req = request, res = response) {
  try {
    const { email } =  req.body;

    if(!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const findEmail = await db.users.findUnique({
      where: { email },
    });

    if(!findEmail) {
      return res.status(200).json({ 
        message: 'If the email exists, you will receive a password reset link' 
      });
    }

    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 jam

    await db.users.update({
      where: { email },
      data: {
        resetToken: resetToken,
        resetTokenExpiry: resetTokenExpiry
      }
    });

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

    // Send mail
    const emailSent = await sendForgotEmail(findEmail.email, resetUrl);
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send link email Forgot Password"
      });
    }

    res.status(200).json({
      status: "success",
      message: "link sent successfully to your email",
      data: {
        email: findEmail.email,
        expiresIn: "1 hours",
        // TODO saat di deploy token di bawah ini di hapus
        token: resetToken
      }
    });
  } catch (error) {
    console.error("Error in send link Forgot Password:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
}

async function getVerifyToken(req = request, res = response) {
  const { token } = req.params;

  try {
    const user = await db.users.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date() // Token must not be expired
        }
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    res.status(200).json({ message: 'Token is valid', token: user.resetToken });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


async function resetPassword(req = response, res = response) {
  const { token } = req.params;
  const { password, confirm_password } = req.body;

  if (!token) {
      return res.status(400).json({ error: 'Token are required' });
    }
  if (password != confirm_password ) {
    return res
    .status(400)
    .json({ message: "Password and confirm password do not match" })
  }
  const hashPassword = await bcrypt.hash(password, 10)

  try {
    // find user valid token
    const user = await db.users.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    await db.users.update({
      where: { id: user.id },
      data: {
        password: hashPassword,
        confirm_password: hashPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    })

    res.status(200).json({ message: 'Password updated successfully' });

  } catch (error) {
  console.error('Reset password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export { forgetPassword, getVerifyToken, resetPassword }