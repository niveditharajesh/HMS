import dotenv from "dotenv";
dotenv.config();
console.log("ENV CHECK:", {
  STRIPE: process.env.STRIPE_SECRET_KEY,
  MONGO: process.env.MONGO_URI,
});

import { stripeWebhook } from "./controllers/userController.js";

//I  added above 2 lines to fix dotenv issue
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
//i  added below line
app.post(
  "/api/user/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

/*app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);*/
//
// Middlewares
console.log("ENV STRIPE:", process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Api Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("API Working");
});

app.listen(port, () => console.log("Server Started ", port));
