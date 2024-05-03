import { keyframes, styled } from "../../styles";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-10px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 1, transform: "translateY(0)" },
  "100%": { opacity: 0, transform: "translateY(-10px)" },
});

export const DropDownWrapper = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "$1",
  cursor: "pointer",

  position: "relative",

  "&:has(input:checked)": {
    div: {
      borderColor: "$main300",
    },

    label: {
      color: "$main300",
    },

    svg: {
      transform: "rotate(180deg)",
      transition: "all .3s",
      path: {
        stroke: "$main300",
      },
    },
  },

  "&:not(:has(input:checked))": {
    svg: {
      transform: "rotate(0deg)",
      transition: "all .3s",
    },
  },
});

export const DropDownContainer = styled("div", {
  width: "100%",
  height: "$10",
  backgroundColor: "$gray300",
  padding: "0 $3",
  borderRadius: "$xs",
  boxSizing: "border-box",
  border: "1px solid $text100",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$2",
  position: "relative",
  transition: "all .3s",

  "&:not(:has(input:disabled)):hover": {
    boxShadow: "rgba(99, 72, 215, .50) 0px 0px 2px",
  },

  input: { display: "none" },

  svg: {
    path: {
      stroke: "$text100",
    },
  },

  variants: {
    chosenOption: {
      false: {
        p: {
          color: "$text100",
        },
      },
    },
  },
});

export const Label = styled("label", {
  fontFamily: "$default",
  color: "$text200",
  fontWeight: "$bold",
  padding: "0 $1",
  lineHeight: "$shorter",
  fontSize: "$xxs",

  transition: "all .3s",
});

export const DropDownOptions = styled("div", {
  width: "99%",
  height: "150px",

  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "$2",
  padding: "$3 $2",

  borderRadius: "$xs",
  boxSizing: "border-box",
  position: "absolute",
  top: "57px",

  left: "0",

  background: "$gray300",
  boxShadow:
    "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",

  variants: {
    visible: {
      true: {
        animation: `${slideUpAndFade} .2s forwards`,
      },
      false: {
        animation: `${slideDownAndFade} .2s forwards`,
      },
    },
  },

  p: {
    width: "100%",
    boxSizing: "border-box",
    padding: "$1 $2",
    borderRadius: "6px",
    userSelect: "none",
  },

  input: {
    all: "unset",
    width: "98%",
    height: "$8",
    minHeight: "$8",
    border: "1px solid $text100",
    borderRadius: "11px",

    fontFamily: "$default",
    fontSize: "$sm",
    padding: "0 $3",
    boxSizing: "border-box",

    "&:focus": {
      borderColor: "$main200",
    },
  },

  "& > div p:hover": {
    background: "$main100",
  },
});
