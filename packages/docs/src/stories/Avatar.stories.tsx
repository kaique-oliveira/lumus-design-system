import { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarTypeProps, Box } from "@lumus-ui/react";

export default {
  title: "Data Display/Avatar",
  component: Avatar,

  args: {
    src: "https://github.com/kaique-oliveira.png",
    alt: "Kaique oliveira",
    width: "4rem",
    height: "4rem",
  },

  argTypes: {
    src: {
      description: "Avatar para ser utilizada foto do usuário.",
      control: {
        type: "text",
      },
    },
  },

  decorators: [
    (Story) => {
      return (
        <Box style={{ width: "80px", background: "transparent" }}>
          {Story()}
        </Box>
      );
    },
  ],
} as Meta<AvatarTypeProps>;

export const Primary: StoryObj<AvatarTypeProps> = {};

export const WithFallBack: StoryObj<AvatarTypeProps> = {
  args: {
    src: "",
    alt: "Kaique oliveira",
  },
};
