import { keyframes, styled } from "../../styles";
import { slideUpAndFade } from "../Popover/styles";

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
  boxShadow: "rgba(0, 0, 0, 0.10) 0px -1px 6px",

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
