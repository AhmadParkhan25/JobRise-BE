import { request, response } from "express";
import axios from "axios";

async function chatbot(req = request, res = response) {
  try {
    const { text } = req.body

    // input validation
    if (!text) {
      return res.status(400).json({
        status: "error",
        message: "Text is required",
      });
    }
    // Kirim POST request ke ML
    const mlResponse = await axios.post(
      "https://machine-learning-production.up.railway.app/predict",
      { text }
    );

    // Ambil hanya field "response" dari hasil ML
    const aiResponse = mlResponse.data.response;

    // Kirim ke frontend/user
    res.status(200).json({
      status: "success",
      message: aiResponse,
    });
  } catch (error) {
    console.error("Error chatbot:", error.message);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

export { chatbot };