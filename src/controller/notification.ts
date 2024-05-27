import { Request, Response } from "express";
import notificationQueueService from "../services/notificationQueueService";
import User from "../database/model/user";

//controller layer which sends notification based on user's score and user sub or unsubbed

export const sendNotification = async (req: Request, res: Response) => {
  try {
    const { email, urgency } = req.body;
    const checkIfEmailPresent = await User.findOne({ email: req.body.email });
    if (
      checkIfEmailPresent &&
      checkIfEmailPresent.score > 0 &&
      checkIfEmailPresent.listen === "subscribed"
    ) {
      const notification = {
        email,
        urgency,
        retryCount: 0,
      };
      await notificationQueueService.addToQueue(notification);
      console.log("notification is added to queue");

      return res
        .status(200)
        .json({ message: "Notification queued successfully" });
    } else {
      if (
        checkIfEmailPresent &&
        checkIfEmailPresent.score <= 0 &&
        checkIfEmailPresent.listen === "subscribed"
      ) {
        return res
          .status(400)
          .json({ error: "user has spammed multiple( 10 or more) times" });
      } else if (
        checkIfEmailPresent &&
        checkIfEmailPresent.score >= 0 &&
        checkIfEmailPresent.listen === "unsubscribed"
      ) {
        return res
          .status(400)
          .json({ error: "user has unsubscribed from the notification." });
      } else if (
        checkIfEmailPresent &&
        checkIfEmailPresent.score <= 0 &&
        checkIfEmailPresent.listen === "unsubscribed"
      ) {
        return res.status(400).json({
          error:
            "user has unsubscribed from the notifications, and also has spammed multiple( 10 or more) times.",
        });
      }
      res.status(404).json({ error: "User not found" });
    }
  } catch (error: any) {
    console.log("error while sending the notification", error);
    res.status(400).json({ error: error.message });
  }
};
