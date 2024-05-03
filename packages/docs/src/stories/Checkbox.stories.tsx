import type { StoryObj, Meta } from "@storybook/react";
import { Box, Checkbox, CheckboxTypeProps, Text } from "@lumus-ui/react";
import { useState } from "react";

export default {
  title: "Form/Checkbox",
  component: Checkbox,

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
      const [terms, setTerms] = useState(false);

      return (
        <Box style={{ width: "200px" }}>
          <Story
            args={{
              keyId: "terms",
              label: "Aceitar termos",
              onCheckedChange: (e: boolean) => setTerms(e),
            }}
          />
          <Text>{terms ? "termos aceitos" : "Os termos são obrigatórios"}</Text>
        </Box>
      );
    },
  ],
} as Meta<CheckboxTypeProps>;

export const Default: StoryObj<CheckboxTypeProps> = {};
