import { slideUpAndFade } from "../Popover/styles";
import { keyframes, styled } from "../../styles";

export const Table = styled("div", {
  width: "max-content",
  background: "$main100",
  padding: "$4",
  borderRadius: "$sm",
  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
});

export const Header = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
  marginTop: "-2px",
  marginBottom: "$4",

  "div:has(input)": {
    width: "200px",
    height: "30px",
    borderRadius: "10px",
  },
});

export const THead = styled("div", {
  height: "40px",
  padding: "0 $3",
  borderRadius: "$xs",
  background: "$gray200",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$4",

  p: {
    color: "$text100",
    fontWeight: "$medium",

    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export const TBody = styled("div", {
  width: "100%",
  height: "var(--height)",
  maxHeight: "calc(100vh - 200px)",

  overflow: "auto",
  padding: "2px 0",

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

export const Row = styled("div", {
  height: "35px",
  padding: "0 $3",

  borderBottom: ".5px solid $gray200",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$4",

  borderRadius: "12px",

  "&:hover": {
    background: "$main100",
  },

  p: {
    color: "$text200",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  button: {
    marginRight: "-8px",
    svg: {
      path: {
        fill: "$text100",
      },
    },
  },

  "& > button:hover": {
    svg: {
      path: {
        fill: "$text200 ",
      },
    },
  },
});

////menu

export const slideDownContext = keyframes({
  "0%": { opacity: 1, transform: "translateY(2px)" },
  "100%": { opacity: 0, transform: "translateY(0)" },
});

export const ContextMenuWrapper = styled("div", {
  position: "fixed",
  opacity: "0",

  left: "var(--left)",
  top: "var(--top)",

  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",

  variants: {
    visible: {
      true: {
        animation: `${slideUpAndFade} .2s forwards`,
      },
      false: {
        animation: `${slideDownContext} .2s forwards`,
      },
    },
  },
});

export const ContextMenuContainer = styled("div", {
  height: "max-content",
  position: "relative",
  background: "$gray300",

  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "2px",

  padding: "$1",
  borderRadius: "$px",
  boxShadow:
    "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",

  button: {
    padding: "4px",
    height: "max-content",
    borderRadius: "8px",

    span: {
      color: "$text200",
      fontSize: "$xs",
    },

    svg: {
      width: "12px",
      height: "12px",
      viewBox: "0 0 12px 12px",
      path: {
        strokeWidth: "1.6",
        stroke: "$text200",
      },
    },
  },

  div: {
    width: "18px",
    height: "16px",
    position: "absolute",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    top: "-2px",

    left: "50%",
    right: "50%",
    transform: "translate(-50%, -50%) rotate(180deg)",

    svg: {
      path: {
        fill: "$gray300",
      },
    },
  },
});

/// footer

export const FooterContainer = styled("div", {
  width: "100%",
  height: "$8",

  marginTop: "$2",
  marginBottom: "-8px",

  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "$2",

  boxSizing: "border-box",

  span: {
    color: "$text200",
    fontSize: "$xxs",
    fontFamily: "$default",
  },

  button: {
    svg: {
      path: {
        stroke: "$text100",
      },
    },
  },
});
