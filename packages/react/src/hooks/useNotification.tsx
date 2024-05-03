import { ReactElement, createContext, useContext, useState } from "react";
import {
  NotificationTypeProps,
  Notification,
} from "../components/Notification";

export interface NotificationInterface {
  notification: NotificationTypeProps | null;
  showNotification(notification: NotificationTypeProps): void;
  hideNotification(): void;
}

export const NotificationContext = createContext<NotificationInterface>(null!);

export const NotificationProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [notification, setNotification] =
    useState<NotificationTypeProps | null>(null);

  const showNotification = (notifi: NotificationTypeProps) => {
    if (notification && notification != notifi) {
      setNotification(null);
    }

    setNotification(notifi);
    if (notifi.timeout) {
      setTimeout(() => setNotification(null), notifi.timeout);
    }
  };

  const hideNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
      <Notification />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
};
