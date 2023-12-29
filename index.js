import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const URI = process.env.MONGODB_CONNECT_URI;
const app = express();
app.use(express.json()); // позволяет читать json из запроса
app.use(cors()); // Разрешает бэкенду получать запросы откуда угодно

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Разрешить доступ только с этого источника
  res.header("Access-Control-Allow-Methods", "*"); // Разрешенные методы запросов
  res.header("Access-Control-Allow-Headers", "*"); // (или Content-Type) Разрешенные заголовки
  next();
});

mongoose
  .connect(URI)
  .then(() => console.log("DB - OK"))
  .catch((err) => console.log(err));

const TestModel = mongoose.model("Test", {
  title: String,
});

app.get("/", async (req, res) => {
  try {
    const items = await TestModel.find(); // Используем метод find() для получения всех записей
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/register", async (req, res) => {
  console.log(req.body.title);

  const doc = new TestModel({
    title: req.body.title,
  });

  const data = await doc.save();

  res.json(data);
});

app.listen("8080", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
