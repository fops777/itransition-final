import mongoose from "mongoose";

// Описываем все свойства которые могут быть у пользователя
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    // passwordHash: {
    //   type: String,
    //   required: true,
    // },
    avaUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
