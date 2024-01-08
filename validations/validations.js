import { body } from "express-validator";

export const loginValidation = [
  body("email", "Incorrect email format").isEmail(),
  body("password"),
];

export const registerValidation = [
  body("email", "Incorrect email format").isEmail(),
  body("password"),
  body("fullName"),
  body("avatarUrl", "Incorrect image url").optional().isURL(),
];

export const collectionCreateValidation = [
  body("title", "Enter collection title").isString(),
  body("text", "Enter text").isString(),
  body("tags", "Incorrect tags format").optional().isArray(),
  body("imageUrl", "Incorrect image url").optional().isString(),
];
