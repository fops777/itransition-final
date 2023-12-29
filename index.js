import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json()); // позволяет читать json из запроса
const URI = process.env.MONGODB_CONNECT_URI;

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
  // res.send("Hey cutiee");
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
