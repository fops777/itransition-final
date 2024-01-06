import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password"),
  body("fullName"),
  body("avatarUrl", "неверная ссылка на аватар").optional().isURL(),
];
