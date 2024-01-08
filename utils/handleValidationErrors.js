import { validationResult } from "express-validator";

export default (req, res, next) => {
  // в errors будут храниться все ошибки которые не прошли registerValidation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  next();
};
