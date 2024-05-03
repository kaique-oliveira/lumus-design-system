import type { StoryObj, Meta } from "@storybook/react";
import { Box, RadioGroup, RadioGroupTypeProps } from "@lumus-ui/react";

export default {
  title: "Form/Radio Group",
  component: RadioGroup,

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
} as Meta<RadioGroupTypeProps>;

export const Default: StoryObj<RadioGroupTypeProps> = {
  args: {
    options: [
      { label: "Cartão", value: "Cartão" },
      { label: "Pix", value: "Pix" },
    ],
  },
};
