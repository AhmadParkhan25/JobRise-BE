import { Resend } from "resend";
const crypto = require('crypto');


const resend = new Resend(process.env.RESEND_API_KEY);

const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
}

async function sendForgotEmail(email, resetUrl) {
  try {
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'JobRise <jobrise@hotelmarisrangkas.com>', // Replace with your domain
      to: email,
      subject: 'Forgot Password Email Verification',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You have requested to reset your password. Click the button below to reset it:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>If the button doesn't work, copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p style="color: #666; font-size: 14px;">
            This link will expire in 1 hour. If you didn't request this, please ignore this email.
          </p>
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


export {
  generateResetToken,
  sendForgotEmail,
}
