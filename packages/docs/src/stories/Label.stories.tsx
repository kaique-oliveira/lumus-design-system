import type { StoryObj, Meta } from "@storybook/react";
import { Box, Label, LabelTypeProps } from "@lumus-ui/react";

export default {
  title: "Typographs/Label",
  component: Label,

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
      return <Box style={{ width: "500px" }}>{Story()}</Box>;
    },
  ],
} as Meta<LabelTypeProps>;

export const Default: StoryObj<LabelTypeProps> = {
  args: {
    children:
      "Este é um exemplo de label, com possibilidade de utilizar o 'htmlFor'",
  },
};
