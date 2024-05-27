import { Request, Response } from "express";
import User from "../database/model/user";


//user controller layer
//helps to add, delete, update user
//user has to be subscribed to sne dnotification, if user not present here we can add user
//and update user info and delete if required

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.log("error while fetching all users from db", error);
    return res.status(400).json({ error: error });
  }
};
const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.log("error while fetching a user from db", error);
    return res.status(400).json({ error: error });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const checkIfExist = await User.findOne({ email: req.body.email });
    if (!checkIfExist) {
      const user = new User(req.body);
      await user.save();
      return res.status(201).json(user);
    }
    return res
      .status(409)
      .json({ error: "email already exist, please use different email" });
  } catch (error) {
    console.log("error while adding a new user to db", error);
    return res.status(400).json({ error: error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.log("error while updating a user from db", error);
    return res.status(400).json({ error: error });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted" });
  } catch (error) {
    console.log("error while deleteing a user from db", error);
    return res.status(400).json({ error: error });
  }
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
