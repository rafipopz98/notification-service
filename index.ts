import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./src/config/config";
import { connectDB } from "./src/database/connectDB";
import userRoute from "./src/routes/user";
import { notificationRouter } from "./src/routes/notification";
import {
  TestSpam,
  TestUnsubscribe,
  TestRetryNotification,
  TestMaxRetryNotification,
} from "./src/services/notificationTest.test";

const app = express();
app.use(express.json());

connectDB();
app.use("/user", userRoute);
app.use("/notification", notificationRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: "Something went wrong!", error: err });
});

//all the test manuall testing

// TestSpam();
// TestUnsubscribe()
// TestRetryNotification();
// TestMaxRetryNotification()

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
