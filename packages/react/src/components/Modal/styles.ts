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

export const ModalContainer = styled("div", {
  width: "250px",
  maxHeight: "85vh",
  backgroundColor: "$gray300",

  borderRadius: "$sm",
  padding: "$4",
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
});

export const ModalHeader = styled("div", {
  width: "100%",
  height: "max-content",

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  marginBottom: "$2",

  button: {
    height: "max-content",
    padding: "0px",

    svg: {
      path: {
        stroke: "$text100",
      },
    },
  },

  p: {
    alignSelf: "center",
  },
});

export const ModalContent = styled("div", {
  width: "100%",
  height: "max-content",

  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
  gap: "$2",
});

export const ModalButtons = styled("div", {
  width: "100%",
  height: "max-content",

  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "$4",

  marginTop: "$2",
});
