import type { StoryObj, Meta } from "@storybook/react";
import { Box, Text, TextTypeProps, Tooltip } from "@lumus-ui/react";

export default {
  title: "Interation/Tooltip",
  component: Text,

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
        <Box
          style={{
            justifyContent: "center",
            width: "max-content",
            background: "transparent",
          }}
        >
          <Tooltip label="Exempo de tooltip.">{Story()}</Tooltip>
        </Box>
      );
    },
  ],
} as Meta<TextTypeProps>;

export const Default: StoryObj<TextTypeProps> = {
  args: {
    children: "Descanse o mouse aqui.",
  },
};
