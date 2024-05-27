import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  getUser,
} from "../controller/user";

const userRoute = express.Router();
userRoute.get("/find/:id", getUser);
userRoute.get("/allUsers", getUsers);
userRoute.post("/addNew", createUser);
userRoute.put("/update/:id", updateUser);
userRoute.delete("/delete/:id", deleteUser);

export default userRoute;
