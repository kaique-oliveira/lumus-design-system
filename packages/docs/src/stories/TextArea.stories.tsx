import type { StoryObj, Meta } from "@storybook/react";
import { Box, TextArea, TextAreaProps } from "@lumus-ui/react";

export default {
  title: "Form/Text Area",
  component: TextArea,

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
        <Box style={{ width: "250px", background: "transparent" }}>
          {Story()}
        </Box>
      );
    },
  ],
} as Meta<TextAreaProps>;

export const Default: StoryObj<TextAreaProps> = {
  args: {
    keyId: "obs",
    label: "Observações",
    caption: { value: "É possivel expandir verticalmente.", state: "info" },
  },
};
