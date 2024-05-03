import { styled } from "../../styles";

export const TextAreaWrapper = styled("div", {
  height: "max-content",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "$1",
  cursor: "pointer",

  label: {
    cursor: "pointer",
  },

  "&:has(textarea:focus)": {
    div: {
      borderColor: "$main300",
      boxShadow: "rgba(4, 84, 255, 0.14) 0px 1px 2px",
    },

    "&:has(textarea:placeholder-shown)": {
      label: {
        color: "$main300",
      },

      "& ~ span": {
        color: "$main300",
      },
    },

    "&:has(textarea:not(:placeholder-shown))": {
      label: {
        color: "$main300",
      },

      "& ~ span": {
        color: "$main300",
      },
    },
  },

  "&:has(textarea:disabled)": {
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

export const TextAreaContainer = styled("div", {
  width: "100%",
  height: "max-content",
  backgroundColor: "$gray300",
  padding: "$2",
  borderRadius: "$xs",
  boxSizing: "border-box",
  border: "1px solid $text100",

  display: "flex",
  alignItems: "center",
  position: "relative",
  transition: "all .2s",

  "&:not(:has(textarea:disabled)):hover": {
    boxShadow: "rgba(99, 72, 215, .50) 0px 0px 2px",
  },
});

export const Area = styled("textarea", {
  width: "100%",
  minHeight: "35px",

  fontFamily: "$default",
  fontSize: "$sm",
  color: "$text300",
  fontWeight: "$regular",
  background: "transparent",
  border: 0,

  resize: "vertical",

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
