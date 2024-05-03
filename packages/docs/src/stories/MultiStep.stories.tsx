import { Meta, StoryObj } from "@storybook/react";
import { MultiStep, MultiStepProps, Box } from "@lumus-ui/react";

export default {
  title: "Surfaces/Multi Step",
  component: MultiStep,

  args: {
    size: 4,
    currentStep: 1,
  },
  decorators: [
    (Story) => {
      return <Box style={{ width: "400px" }}>{Story()}</Box>;
    },
  ],
} as Meta<MultiStepProps>;

export const Primary: StoryObj<MultiStepProps> = {};

export const Full: StoryObj<MultiStepProps> = {
  args: {
    currentStep: 4,
  },
};
