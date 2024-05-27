import * as schedule from "node-schedule";
import sendEmail from "./emailService";
import * as fs from "fs";
import * as path from "path";
import { NotificationQueue as Notification } from "../types/types";
// max amount of retries
const MAX_RETRIES = 3;

//Interval at each retries
const RETRY_INTERVALS = [30 * 1000, 1 * 60 * 1000, 15 * 60 * 1000]; // 30 seconds, 1 minute, 15 minutes

//class to handle notification queue
class NotificationQueueService {
  //Step: 1: Create empty queue
  //Step: 2: Add the notification to the queue
  //Step: 3: Proceesing the queue, if notification present in the queue then check the urgency,
  //         calculate the delay according urgency and add it to the scheduler.
  //Step: 4: sendNotification() <-- Function that handles scheduling of tasks
  //Step: 5: according success and failure operate; if Success then log it and remove from the queue
  //         else retry until max reties, if success whiule retrying then log it remove from queue,if still fails remove from queue

  private queue: Notification[] = [];

  public addToQueue(notification: Notification) {
    this.queue.push(notification);
    console.log("in queue", this.queue);
    this.processQueue();
  }

  private processQueue() {
    console.log("proccessing in the queue");
    this.queue.forEach((notification) => {
      const delay = this.calculateDelay(notification);
      const job = schedule.scheduleJob(Date.now() + delay, async () => {
        console.log("trying to send the message in schedulerr");
        await this.sendNotification(notification);
        this.queue = this.queue.filter(
          (queuedNotification) => queuedNotification !== notification
        );
        job.cancel(); // Cancel the job after sending the notification
      });
    });
  }

  private calculateDelay(notification: Notification): number {
    switch (notification.urgency) {
      case "high":
        return 5 * 1000; // 5 seconds
      case "medium":
        return 1 * 60 * 1000; // 1 minute
      case "low":
        return 2 * 60 * 1000; // 2 minutes
      default:
        return 0;
    }
  }

  private async sendNotification(notification: Notification) {
    //html template fetch
    let htmlContent = "";

    let filePath = "";
    if (notification.urgency === "high") {
      filePath = path.join(__dirname, "..", "template", "high.html");
    } else if (notification.urgency === "medium") {
      filePath = path.join(__dirname, "..", "template", "medium.html");
    } else {
      filePath = path.join(__dirname, "..", "template", "low.html");
    }

    htmlContent = fs.readFileSync(filePath, "utf-8");
    console.log("sending the email");
    //email body
    const success = await sendEmail(
      notification.email,
      "Notification",
      htmlContent
    );
    console.log(success, "successs msg");
    if (!success) {
      this.handleFailure(notification);
    } else {
      this.handleSuccess(notification);
    }
  }

  public handleFailure(notification: Notification) {
    if (notification.retryCount < MAX_RETRIES) {
      console.log("Retrying to send the notification");
      const retryInterval = RETRY_INTERVALS[notification.retryCount];
      setTimeout(async () => {
        notification.retryCount++;
        await this.sendNotification(notification);
      }, retryInterval);
    } else {
      console.log("Max retries completed, notification bounced");
      this.queue = this.queue.filter(
        (queuedNotification) => queuedNotification !== notification
      );
    }
  }

  private handleSuccess(notification: Notification) {
    console.log(`Notification sent to ${notification.email}`);
    this.queue = this.queue.filter(
      (queuedNotification) => queuedNotification !== notification
    );
  }
}

export default new NotificationQueueService();
