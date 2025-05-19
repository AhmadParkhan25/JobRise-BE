import express from "express";
import cors from "cors";
import env from "dotenv";
import authRoute from "./routes/authRoute";
import path from "path";
import profileRoute from "./routes/profileRoute";

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

app.use(
  "/public",
  express.static(path.join(__dirname, "../public/img_ProfileUser"))
)

app.use(
  "/public",
  express.static(path.join(__dirname, "../public/img_ProfileCompany"))
)


// routes
app.use(authRoute);
app.use(profileRoute);


app.listen(PORT, () => {
  console.log(`
    ===========================
    
    Server running on port ${PORT}
    
    ===========================
    `);
})