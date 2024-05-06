import type { StoryObj, Meta } from "@storybook/react";
import { Box, TextInput, TextInputProps, Popover } from "@lumus-ui/react";

export default {
  title: "Interation/Popover",
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
  },

  decorators: [
    (Story) => {
      return (
        <Box style={{ width: "max-content", background: "transparent" }}>
          <Popover title="Dimensão" icon="setting_1">
            <>
              <Story
                args={{
                  keyId: "largura",
                  label: "Largura",
                  caption: { value: "Digite apenas números.", state: "info" },
                  mask: "number",
                }}
              />

              <Story
                args={{
                  keyId: "altura",
                  label: "Altura",
                  caption: { value: "Digite apenas números.", state: "info" },
                  mask: "number",
                }}
              />
            </>
          </Popover>
        </Box>
      );
    },
  ],
} as Meta<TextInputProps>;

export const Default: StoryObj<TextInputProps> = {};
