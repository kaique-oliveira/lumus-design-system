import { styled } from "../../styles";
import { Text } from "../Text";

export const MultiStepContainer = styled("div", {
  width: "100%",
});

export const Label = styled(Text, {
  color: "$text200",

  defaultVariants: {
    size: "xs",
  },
});

export const Steps = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  gap: "$2",
});

export const Step = styled("div", {
  width: "100%",
  height: "$1",
  borderRadius: "$px",
  background: "$text100",

  variants: {
    active: {
      true: {
        background: "$main200",
      },
    },
  },
});
