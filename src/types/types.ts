export interface User {
  email: string;
  status: "active" | "inactive";
  score: number;
  listen: "subscribed" | "unsubscribed";
}

export interface Event {
  email: string;
  urgency: "high" | "medium" | "low";
  status: "pending" | "sent" | "failed" | "retrying" | "dead";
  retryCount: number;
  user: User;
}

export interface Notification {
  email: string;
  urgency: "high" | "medium" | "low";
  userActivity: "active" | "inactive";
}

export interface NotificationQueue {
  email: string;
  urgency: "high" | "medium" | "low";
  retryCount: number;
}

export const RetryNotification: NotificationQueue = {
  email: "test@gmail.com",
  urgency: "high",
  retryCount: 1,
};

export const MaxRetryNotification: NotificationQueue = {
  email: "test@gmail.com",
  urgency: "high",
  retryCount: 4,
};
