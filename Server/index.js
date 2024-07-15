import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cors());
app.use(express.json());
app.set('trust proxy', true); 

import userRouter from "./routes/auth.route.js";
import chpRouter from "./routes/chp.route.js";
import unloadingEndRouter from "./routes/unloadingEnd.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v2/chp", chpRouter);
app.use("/api/v3/unloadingEnd", unloadingEndRouter)

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(port))
  .then(() =>
    console.log(`⚙️  Server is running and connected to db at port ${port} :)`)
  )
  .catch((err) => console.log(`${err} is error`));
