import { styled } from "../../styles";
import * as Switch from "@radix-ui/react-switch";

export const SwitchWrapper = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "$2",
  cursor: "pointer",

  label: {
    cursor: "pointer",
  },
});

export const SwitchContainer = styled(Switch.Root, {
  all: "unset",
  width: "44px",
  height: "26px",
  background: "$gray200",
  filter: "brightness(0.92)",
  borderRadius: "9999px",
  position: "relative",
  transition: "all .2s",
  cursor: "pointer",

  "&:focus": {
    boxShadow: "0 0 0 2px black",
  },

  "&:has([data-state='checked'])": {
    background: "$success",
  },

  "&:is(:disabled)": {
    background: "$gray200",
    filter: "brightness(1.08)",

    span: {
      background: "$gray100",
      boxShadow: "none",
    },
  },
});

export const SwitchThumb = styled(Switch.Thumb, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: " 22px",
  height: "22px",
  background: "$gray300",
  filter: "brightness(1.2)",
  borderRadius: "$full",
  transition: "transform 200ms",
  transform: "translateX(2px)",
  willChange: "transform",
  boxShadow: "rgba(0,0,0, 0.15) 0 2px 2px",

  svg: {
    path: {
      stroke: "$gray300",
      fill: "$gray300",
    },
  },

  "&[data-state='checked']": {
    transform: "translateX(20px)",

    svg: {
      path: {
        stroke: "$success",
        fill: "$success",
      },
    },
  },
});
