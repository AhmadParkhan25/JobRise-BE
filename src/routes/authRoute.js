import { Router } from "express";
import { createUser, createUserCompany } from "../controllers/auth/createUser";
import { getUsers } from "../controllers/auth/getUsers";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { getUserByAuth } from "../controllers/auth/getUserByAuth";
import { login, loginCompany } from "../controllers/auth/login";
import { chatbot } from "../controllers/chatbot/chatbot";
import { sendOTP, verifyOTP } from "../controllers/auth/emailVerification";


const authRoute = new Router();

// Register
authRoute.post('/api/register', createUser);

// Register Company
authRoute.post('/api/register-company', createUserCompany)

// login
authRoute.post('/api/login', login)

// Login company
authRoute.post('/api/login-company', loginCompany)

// Get users
authRoute.get('/api/users', getUsers);

// Get user by Auth
authRoute.get('/api/user-auth', validateMiddleUser, getUserByAuth);

// Send OTP for email verification
authRoute.post('/api/send-verification-otp', validateMiddleUser, sendOTP);

// Verify OTP
authRoute.post('/api/verify-email', validateMiddleUser, verifyOTP);

// chatbot
authRoute.post('/api/chatbot', validateMiddleUser, chatbot);


export default authRoute;