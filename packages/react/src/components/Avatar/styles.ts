import * as Avatar from "@radix-ui/react-avatar";
import { styled } from "../../styles";

export const AvatarContainer = styled(Avatar.Root, {
  borderRadius: "$full",
  display: "inline-block",
  width: "var(--width)",
  height: "var(--height)",

  overflow: "hidden",
  border: "4px solid $main200",
  padding: "2px",
});

export const AvatarImage = styled(Avatar.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

export const AvatarFallback = styled(Avatar.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",

  color: "$gray200",

  svg: {
    width: "90%",
    height: "80%",

    path: {
      stroke: "$main200",
    },
  },
});
