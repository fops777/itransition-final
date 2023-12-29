import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const URI = process.env.MONGODB_CONNECT_URI;

mongoose
  .connect(URI)
  .then(() => console.log("DB - OK"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hey cutiee");
});

app.listen("8080", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
