import { styled } from "../../styles";

export const ScroolAreaContainer = styled("div", {
  width: "100%",
  maxHeight: "var(--size-vertical)",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "$2",

  paddingRight: "4px",

  overflowY: "auto",
  overflowX: "none",

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "$main200",
    borderRadius: "$xs",
  },

  "&::-webkit-scrollbar": {
    width: "6px",
    backgroundColor: "$main100",
    borderRadius: "$xs",
  },
});
