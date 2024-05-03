import { styled } from "@stitches/react";

export const LabelContainer = styled("label", {
  fontFamily: "$default",
  lineHeight: "$base",
  margin: 0,
  color: "$text300",

  variants: {
    size: {
      xxs: { fontSize: "$xxs" },
      xs: { fontSize: "$xs" },
      sm: { fontSize: "$sm" },
      md: { fontSize: "$md" },
      lg: { fontSize: "$lg" },
      xl: { fontSize: "$xl" },
    },
  },

  defaultVariants: {
    size: "md",
  },
});
