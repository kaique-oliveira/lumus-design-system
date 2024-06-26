import { styled } from "@lumus-ui/react/src/styles/index";

export const Container = styled("div", {
  width: "100%",
  height: "100%",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  gap: "$8",

  paddingLeft: "32px",
});
