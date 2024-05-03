import { styled } from "../../styles";

export const TagContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  padding: "$2 $4",
  gap: "$2",

  borderRadius: "$md",
  background: "$gray300",
  transition: "all .2s",
  cursor: "pointer",
  userSelect: "none",

  p: {
    color: "$text100",
  },

  input: {
    display: "none",
  },

  "&:has(input:checked)": {
    background: "$main100",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 2px",

    p: {
      color: "$main400",
    },
  },
});
