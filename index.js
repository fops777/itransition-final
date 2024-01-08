import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import {
  registerValidation,
  loginValidation,
  collectionCreateValidation,
} from "./validations/validations.js";
import { CollectionController, UserController } from "./controllers/index.js";
// import {
//   register,
//   login,
//   getMe,
//   getAll,
// } from "./controllers/UserController.js";
// import {
//   create,
//   getAllCollections,
//   getOneCollection,
//   deleteCollection,
//   updateCollection,
// } from "./controllers/CollectionController.js";

// Configurations
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

app.get("/admin", UserController.getAll);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/collections", CollectionController.getAllCollections);
app.get("/collections/:id", CollectionController.getOneCollection);
app.post(
  "/collections",
  checkAuth,
  collectionCreateValidation,
  handleValidationErrors,
  CollectionController.createCollection
);
app.delete(
  "/collections/:id",
  checkAuth,
  CollectionController.deleteCollection
);
app.patch(
  "/collections/:id",
  checkAuth,
  collectionCreateValidation,
  handleValidationErrors,
  CollectionController.updateCollection
);

app.listen("8080", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
