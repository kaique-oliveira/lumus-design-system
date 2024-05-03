import { keyframes, styled } from "../../styles";

export const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(0)" },
  "100%": { opacity: 1, transform: "translateY(2px)" },
});

export const PopoverContainer = styled("div", {
  position: "relative",
  display: "inline-block",
});

export const PopoverWrapper = styled("div", {
  userSelect: "none",
  cursor: "default",
  opacity: 0,
  transform: "translateY(0)",

  width: "250px",
  backgroundColor: "$gray300",

  borderRadius: "$sm",
  padding: "$4",
  position: "absolute",
  zIndex: "1",
  top: "120%",
  left: "50%",

  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "$2",

  boxShadow:
    "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",

  variants: {
    visible: {
      true: {
        animation: `${slideUpAndFade} .2s forwards`,
      },
    },
    position: {
      left: {
        marginLeft: "-21px",
      },
      right: {
        marginLeft: "-260px",
      },
      center: {
        marginLeft: "-140px",
      },
    },
  },
});

export const PopoverHeader = styled("div", {
  width: "100%",
  height: "max-content",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  marginBottom: "$2",

  variants: {
    position: {
      left: {
        div: {
          position: "absolute",
          top: "-33px",
          left: "-8px",

          transform: "rotate(180deg)",

          svg: {
            path: {
              fill: "$gray300",
            },
          },
        },
      },
      right: {
        div: {
          position: "absolute",
          top: "-33px",
          right: "-8px",

          transform: "rotate(180deg)",

          svg: {
            path: {
              fill: "$gray300",
            },
          },
        },
      },
      center: {
        div: {
          width: "18px",
          height: "16px",
          position: "absolute",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          top: "-18px",

          left: "50%",
          right: "50%",
          transform: "translate(-50%, -50%) rotate(180deg)",

          svg: {
            path: {
              fill: "$gray300",
            },
          },
        },
      },
    },
  },

  button: {
    height: "max-content",
    padding: "0px",
  },
});
