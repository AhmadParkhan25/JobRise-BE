import express from "express";
import cors from "cors";
import env from "dotenv";
import authRoute from "./routes/authRoute";
// import path from "path";

// configuration
const app = express();
env.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(
  express.json({
    limit: "100mb",
  })
);

app.use(
  express.urlencoded({
    extended: "true",
  })
)


// routes
app.use(authRoute);


app.listen(PORT, () => {
  console.log(`
    ===========================
    
    Server running on port ${PORT}
    
    ===========================
    `);
})