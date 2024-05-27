import {
  MaxRetryNotification,
  NotificationQueue,
  RetryNotification,
} from "../types/types";
import { handleSpamComplaint, handleUnsubscribe } from "./compliance";
import notificationQueueService from "./notificationQueueService";

// Test case: Handling a spam complaint
export const TestSpam = () => {
  console.log("Reporting Spam");
  handleSpamComplaint("test@gmail.com");
};

// Test case: Handling an unsubscribe request
export const TestUnsubscribe = () => {
  console.log("Unsubscribing from the notification");
  handleUnsubscribe("mrafi.dev@gmail.com");
};

export const TestRetryNotification = () => {
  console.log("Retrying to send the notifications for the 2nd time");
  notificationQueueService.handleFailure(RetryNotification);
};

export const TestMaxRetryNotification = () => {
  console.log("Retrying to send the notifications for the 4th time");
  notificationQueueService.handleFailure(MaxRetryNotification);
};
