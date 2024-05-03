import { styled } from "../../styles";

export const SeparatorContainer = styled("div", {
  background: "$main200",
  filter: "brightness(1.2)",

  variants: {
    orientation: {
      vertical: {
        width: "var(--width-size)",
        height: "var(--height-size)",
      },
      horizontal: {
        width: "var(--width-size)",
        height: "var(--height-size)",
      },
    },
  },
});
