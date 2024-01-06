import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    // в errors будут храниться все ошибки которые не прошли registerValidation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    // С клиента на сервак пароль можно передавать в открытом виде,
    // фронт не должен шифровать пароль
    // Пароль должен шифровать бэкенд
    // const password = req.body.password;
    // let salt = await bcrypt.genSalt(10); // алгоритм шифрования
    // const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      // passwordHash,
      password: req.body.password, // custom
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    res.json({ ...user._doc, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    // Находим юзера по емейлу из req.body.email
    const user = await UserModel.findOne({ email: req.body.email });

    // Если не нашли пользователя, отправляем ошибку на клиент
    if (!user) {
      return res.status(404).json({
        // На самом деле не найден пользователь c емейлом из req.body.email
        message: "Invalid password or email address",
      });
    }

    // Проверка совпадают ли пароли из req.body.password и пароль найденного юзера
    // const isValidPassword = await bcrypt.compare(
    //   req.body.password,
    //   user._doc.passwordHash
    // );

    const isValidPassword = req.body.password === user._doc.password; // custom

    if (!isValidPassword) {
      return res.status(400).json({
        // На самом деле неверный только пароль
        message: "Invalid password or email address",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    res.json({ ...user._doc, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Authorization failed",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({ ...user._doc });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No access",
    });
  }
};

// My custom
export const getAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить юзеров",
    });
  }
};
