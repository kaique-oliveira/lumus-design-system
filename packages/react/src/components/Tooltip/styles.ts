import { keyframes, styled } from "../../styles";

const fade = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.8 },
});

export const TooltipContainer = styled("div", {
  position: "relative",
  display: "inline-block",
});

export const TooltipText = styled("span", {
  userSelect: "none",
  cursor: "default",
  opacity: 0,

  maxWidth: "300px",
  backgroundColor: "$gray300",
  color: "$text200",
  fontFamily: "$default",
  textAlign: "center",
  fontSize: "$xxs",
  fontWeight: "$regular",

  padding: "4px 16px",
  position: "absolute",
  zIndex: "1",

  left: "50%",
  marginLeft: "-63px",
  backdropFilter: "opacity(.1)",

  variants: {
    visible: {
      true: {
        animation: `${fade} .2s forwards`,
      },
    },
    position: {
      top: {
        bottom: "125%",
        boxShadow:
          "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
      },
      bottom: {
        top: "140%",
        boxShadow:
          "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
      },
    },
    sizeText: {
      small: {
        borderRadius: "8px",
      },
      large: {
        borderRadius: "10px",
      },
    },
  },
});

export const WrapperArrow = styled("div", {
  position: "relative",
  width: "100%",
  height: "100%",

  variants: {
    position: {
      top: {
        div: {
          position: "absolute",
          bottom: "-21px",
          left: "40%",
          right: "40%",

          svg: {
            path: {
              fill: "$gray300",
            },
          },
        },
      },
      bottom: {
        div: {
          position: "absolute",
          top: "-21px",
          left: "40%",
          right: "40%",
          transform: "rotate(180deg)",

          svg: {
            path: {
              fill: "$gray300",
            },
          },
        },
      },
    },
  },
});
