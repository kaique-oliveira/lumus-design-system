import { fontWeights } from "@lumus-ui/tokens";
import { styled } from "../../styles";

export const TextInputWrapper = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "$1",
  cursor: "pointer",

  label: {
    cursor: "pointer",
  },

  "&:has(input:focus)": {
    div: {
      borderColor: "$main300",
      boxShadow: "rgba(4, 84, 255, 0.14) 0px 1px 2px",
    },

    "&:has(input:placeholder-shown)": {
      label: {
        color: "$main300",
      },

      "& ~ span": {
        color: "$main300",
      },
    },

    "&:has(input:not(:placeholder-shown))": {
      label: {
        color: "$main300",
      },

      "& ~ span": {
        color: "$main300",
      },
    },
  },

  "&:has(input:disabled)": {
    div: {
      cursor: "not-allowed",
      borderColor: "$gray200",
      background: "$gray100",
    },

    label: {
      color: "$text100",
    },
  },
});

export const TextInputContainer = styled("div", {
  width: "100%",
  height: "$10",
  backgroundColor: "$gray300",
  padding: "0 $3",
  borderRadius: "$xs",
  boxSizing: "border-box",
  border: "1px solid $text100",

  display: "flex",
  alignItems: "center",
  position: "relative",
  transition: "all .2s",
  gap: "$1",

  "&:not(:has(input:disabled)):hover": {
    boxShadow: "rgba(99, 72, 215, .50) 0px 0px 2px",
  },

  svg: {
    path: {
      stroke: "$text100",
    },
  },
});

export const Input = styled("input", {
  fontFamily: "$default",
  fontSize: "$sm",
  color: "$text300",
  fontWeight: "$regular",
  background: "transparent",
  border: 0,
  width: "100%",

  "&:focus": {
    outline: 0,
  },

  "&:disabled": {
    cursor: "not-allowed",
  },

  "&::placeholder": {
    color: "$text100",
  },
});

export const Label = styled("label", {
  fontFamily: "$default",
  color: "$text200",
  fontWeight: "$bold",
  padding: "0 $1",
  lineHeight: "$shorter",
  fontSize: "$xxs",

  transition: "all .2s",
});

export const Caption = styled("span", {
  fontFamily: "$default",
  color: "var(--state)",
  fontWeight: "$regular",
  fontSize: "$xxs",
  marginLeft: "4px",
  marginTop: "-2px",
});

export const Prefix = styled("span", {
  color: "$text100",
  fontFamily: "$default",
  fontSize: "$sm",
});
