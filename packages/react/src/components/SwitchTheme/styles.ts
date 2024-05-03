import { styled } from "../../styles";
import * as Switch from "@radix-ui/react-switch";

export const SwitchThemeContainer = styled(Switch.Root, {
  all: "unset",
  width: "51px",
  height: "30px",
  background: "$gray200",
  borderRadius: "9999px",
  position: "relative",
  transition: "all .2s",
  boxShadow: "rgba(0,0,0, 0.25) 0 1px 2px",
  cursor: "pointer",

  "&:focus": {
    boxShadow: "0 0 0 2px black",
  },

  "&:has([data-state='checked'])": {
    background: "$dark_gray300",
  },
});

export const SwitchThemeThumb = styled(Switch.Thumb, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  width: " 26px",
  height: "26px",
  background: "$white",
  borderRadius: "$full",
  transition: "transform 200ms",
  transform: "translateX(2px)",
  willChange: "transform",
  boxShadow: "rgba(0,0,0, 0.25) 0 2px 2px",

  svg: {
    path: {
      stroke: "$warning",
      fill: "$warning",
    },
  },

  "&[data-state='checked']": {
    transform: "translateX(23px)",

    svg: {
      path: {
        stroke: "$light_gray400",
        fill: "$light_gray400",
      },
    },
  },
});
