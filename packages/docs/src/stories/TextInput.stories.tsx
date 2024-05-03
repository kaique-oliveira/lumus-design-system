import type { StoryObj, Meta } from "@storybook/react";
import { Box, TextInput, TextInputProps } from "@lumus-ui/react";

export default {
  title: "Form/Text Input",
  component: TextInput,

  args: {
    disabled: false,
  },

  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    mask: {
      options: ["number", "cpf", "telefone", "cep", "cnpj"],
      control: {
        type: "inline-radio",
      },
    },
  },

  decorators: [
    (Story) => {
      return (
        <Box style={{ width: "200px", background: "transparent" }}>
          {Story()}
        </Box>
      );
    },
  ],
} as Meta<TextInputProps>;

export const Default: StoryObj<TextInputProps> = {
  args: {
    keyId: "cpf",
    label: "CPF",
    placeholder: "XXX.XXX.XXX-XX",
    caption: { value: "Digite apenas números.", state: "info" },
    mask: "cpf",
  },
};
