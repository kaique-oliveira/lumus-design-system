import { keyframes, styled } from "../../styles";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(100px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 1, transform: "translateY(0)" },
  "100%": { opacity: 0, transform: "translateY(100px)" },
});

export const BackContainer = styled("div", {
  width: "100vw",
  height: "100vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  background: "pink",
  position: "fixed",
  left: 0,
  top: 0,

  backgroundColor: "transparent",
  backdropFilter: "blur(.8px)",
});

export const DialogContainer = styled("div", {
  width: "250px",
  backgroundColor: "$gray300",

  borderRadius: "$sm",
  padding: "$2",
  position: "fixed",

  zIndex: "1",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "$3",

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

  "& > :first-child": {
    fontWeight: "$medium",
  },

  "& > :nth-child(2)": {
    color: "$main400",
  },
});

export const WrapperButtons = styled("div", {
  width: "100%",
  height: "max-content",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  gap: "$4",

  button: {
    height: "max-content",
    padding: "2px",

    span: {
      fontSize: "$sm",
      color: "$text200",
    },
  },
});
