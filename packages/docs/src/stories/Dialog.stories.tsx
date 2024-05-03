import { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Button,
  ButtonTypeProps,
  useDialog,
  useNotification,
} from "@lumus-ui/react";

export default {
  title: "Interation/Dialog",
  component: Button,

  decorators: [
    (Story) => {
      const dialog = useDialog();
      const notification = useNotification();

      const handleSucesso = () => {
        dialog.showDialog({
          message: "Deseja apagar o item?",
          callback: () => {
            dialog.hideDialog();
            notification.showNotification({
              type: "success",
              message: "Exemplo de notificação de sucesso.",
              timeout: 4000,
            });
          },
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
              label: "Deletar",
              onClick: handleSucesso,
            }}
          />
        </Box>
      );
    },
  ],
} as Meta<ButtonTypeProps>;

export const Primary: StoryObj<ButtonTypeProps> = {};
