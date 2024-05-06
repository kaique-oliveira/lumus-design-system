import { Icons } from "../../assets/icons";
import { useNotification } from "../../hooks/useNotification";

import { Text } from "../Text";
import { NotificationContainer } from "./styles";

export interface NotificationTypeProps {
  type: "info" | "success" | "warning" | "error";
  message: string;
  timeout?: number;
}

export const Notification = () => {
  const notify = useNotification();

  return (
    <NotificationContainer
      toggleShow={notify.notification ? "show" : "hidden"}
      state={notify.notification?.type}
    >
      <Text sizeText={"sm"}>{notify.notification?.message}</Text>

      {notify.notification?.type === "success" && Icons.success}
      {notify.notification?.type === "error" && Icons.close_circle}
      {notify.notification?.type === "warning" && Icons.warning}
      {notify.notification?.type === "info" && Icons.info_circle}
    </NotificationContainer>
  );
};
