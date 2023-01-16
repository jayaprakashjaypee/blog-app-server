import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();
const port = 5000;
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.use("/users", userRouter);
app.use("/blog", blogRouter);

mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => console.log(`${err} did not connect`));
