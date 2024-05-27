import express from "express";
import { sendNotification } from "../controller/notification";

export const notificationRouter = express.Router();

notificationRouter.post("/send", sendNotification);
