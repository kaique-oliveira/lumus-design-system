import { Meta, StoryObj } from "@storybook/react";
import { Box, Button, ButtonTypeProps, useNotification } from "@lumus-ui/react";
import { colors } from "@lumus-ui/tokens";

export default {
  title: "Interation/Notification",
  component: Button,

  decorators: [
    (Story) => {
      const notificationContext = useNotification();

      const handleSucesso = () => {
        notificationContext.showNotification({
          type: "success",
          message: "Exemplo de notificação de sucesso.",
          timeout: 5000,
        });
      };

      const handleWarning = () => {
        notificationContext.showNotification({
          type: "warning",
          message: "Exemplo de notificação de aviso.",
          timeout: 5000,
        });
      };

      const handleError = () => {
        notificationContext.showNotification({
          type: "error",
          message: "Exemplo de notificação de erro.",
          timeout: 5000,
        });
      };

      const handleInfo = () => {
        notificationContext.showNotification({
          type: "info",
          message: "Exemplo de notificação de informação.",
          timeout: 5000,
        });
      };

      return (
        <Box
          style={{
            width: "max-content",
            flexDirection: "row",
            background: "transparent",
          }}
        >
          <Story
            args={{
              style: {
                background: colors.success,
                borderColor: colors.success,
              },
              label: "Sucesso",
              onClick: handleSucesso,
            }}
          />

          <Story
            args={{
              style: {
                background: colors.warning,
                borderColor: colors.warning,
              },
              label: "Aviso",
              onClick: handleWarning,
            }}
          />
          <Story
            args={{
              style: { background: colors.error, borderColor: colors.error },
              label: "Error",
              onClick: handleError,
            }}
          />
          <Story
            args={{
              style: {
                background: colors.main200,
                borderColor: colors.main200,
              },
              label: "Informação",
              onClick: handleInfo,
            }}
          />
        </Box>
      );
    },
  ],
} as Meta<ButtonTypeProps>;

export const Primary: StoryObj<ButtonTypeProps> = {};
