import { Schema, model } from "mongoose";
import { User } from "../../types/types";

//user model

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  score: { type: Number, default: 100 },
  listen: {
    type: String,
    enum: ["subscribed", "unsubscribed"],
    default: "subscribed",
  },
});

const User = model<User>("User", userSchema);

export default User;
