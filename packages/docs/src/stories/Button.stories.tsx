import type { StoryObj, Meta } from "@storybook/react";
import { Box, Button, ButtonTypeProps } from "@lumus-ui/react";

export default {
  title: "Form/Button",
  component: Button,

  args: {
    disabled: false,
    variant: "contained",
    iconPosition: "left",
  },

  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    variant: {
      options: ["contained", "outlined", "text"],
      control: {
        type: "inline-radio",
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
} as Meta<ButtonTypeProps>;

export const OnlyText: StoryObj<ButtonTypeProps> = {
  args: {
    label: "Enviar",
  },
};

export const TextAndIcon: StoryObj<ButtonTypeProps> = {
  args: {
    label: "Enviar",
    icon: "add",
  },
  argTypes: {
    iconPosition: {
      options: ["left", "right"],
      control: {
        type: "inline-radio",
      },
    },
  },
};

export const OnlyIcon: StoryObj<ButtonTypeProps> = {
  args: {
    icon: "add",
  },
};
