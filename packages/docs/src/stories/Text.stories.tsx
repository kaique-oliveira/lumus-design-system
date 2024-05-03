import type { StoryObj, Meta } from "@storybook/react";
import { Box, Text, TextTypeProps } from "@lumus-ui/react";

export default {
  title: "Typographs/Text",
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
      return <Box style={{ width: "max-content" }}>{Story()}</Box>;
    },
  ],
} as Meta<TextTypeProps>;

export const Default: StoryObj<TextTypeProps> = {
  args: {
    children: "Este é um exemplo de tag p.",
  },
};
