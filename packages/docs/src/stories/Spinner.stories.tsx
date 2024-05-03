import type { StoryObj, Meta } from "@storybook/react";
import { Spinner, SpinnerTypeProps } from "@lumus-ui/react";

export default {
  title: "Interation/Spinner",
  component: Spinner,
} as Meta<SpinnerTypeProps>;

export const Small: StoryObj<SpinnerTypeProps> = {
  args: {
    sizeSpinner: "small",
  },
};

export const Medium: StoryObj<SpinnerTypeProps> = {
  args: {
    sizeSpinner: "medium",
  },
};

export const Large: StoryObj<SpinnerTypeProps> = {
  args: {
    sizeSpinner: "large",
  },
};
