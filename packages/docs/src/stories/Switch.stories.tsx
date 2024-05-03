import type { StoryObj, Meta } from "@storybook/react";
import { Box, Switch, SwitchTypeProps } from "@lumus-ui/react";

export default {
  title: "Form/Switch",
  component: Switch,

  args: {
    disabled: false,
  },

  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },

  decorators: [
    (Story) => {
      return (
        <Box style={{ width: "max-content", background: "transparent" }}>
          {Story()}
        </Box>
      );
    },
  ],
} as Meta<SwitchTypeProps>;

export const Default: StoryObj<SwitchTypeProps> = {
  args: {
    keyId: "permitir",
    label: "Ativar Notificações",
  },
};
