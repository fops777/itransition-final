import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import {
  register,
  login,
  getMe,
  getAll,
} from "./controllers/UserController.js";

dotenv.config();
const URI = process.env.MONGODB_CONNECT_URI;
const app = express();
app.use(express.json()); // позволяет читать json из запроса
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Разрешить доступ со всех испочников
  res.header("Access-Control-Allow-Methods", "*"); // Разрешенные методы запросов (все)
  res.header("Access-Control-Allow-Headers", "*"); // (или Content-Type) Разрешенные заголовки
  next();
});

mongoose
  .connect(URI)
  .then(() => console.log("DB - OK"))
  .catch((err) => console.log(err));

app.post("/auth/login", login);
app.post("/auth/register", registerValidation, register);
app.get("/auth/me", checkAuth, getMe);

// My custom
app.get("/", getAll);

app.listen("8080", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
