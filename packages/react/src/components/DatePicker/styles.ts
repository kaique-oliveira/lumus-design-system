import { keyframes, styled } from "../../styles";
import { Calendar } from "../Calendar";
import { slideUpAndFade } from "../Popover/styles";
import { TextInput } from "../TextInput";

export const slideAndFadeHide = keyframes({
  "0%": { opacity: 1, transform: "translateY(2px)" },
  "100%": { opacity: 0, transform: "translateY(0)" },
});

export const DatePickerWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  userSelect: "none",
});

export const DatePickerInput = styled(TextInput, {});

export const CalendarContainer = styled("div", {
  position: "absolute !important",
  top: "58px",

  boxShadow: "rgba(0,0,0, .10) 0px 0px 4px",
  borderRadius: "$px",

  variants: {
    visible: {
      true: {
        animation: `${slideUpAndFade} .2s forwards`,
      },
      false: {
        animation: `${slideAndFadeHide} .2s forwards`,
      },
    },
  },
});
