import { keyframes, styled } from "../../styles";

const spin = keyframes({
  "0%": {
    transform: "rotate(360deg)",
  },
});

export const SpinnerContainer = styled("div", {
  width: "100%",
  height: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 50,
  backgroundColor: "rgba(177, 177, 177, 0.25)",
  backdropFilter: "blur(2px)",
  WebkitBackdropFilter: "blur(4px)",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
});

export const Spi = styled("div", {
  borderRadius: "50%",

  variants: {
    sizeSpinner: {
      small: {
        border: "4px solid rgba(0, 0, 0, 0.1)",
        width: "20px",
        height: "20px",
        borderLeftColor: "$main300",
      },
      medium: {
        border: "6px solid rgba(0, 0, 0, 0.1)",
        width: "30px",
        height: "30px",
        borderLeftColor: "$main300",
      },
      large: {
        border: "8px solid rgba(0, 0, 0, 0.1)",
        width: "40px",
        height: "4  0px",
        borderLeftColor: "$main300",
      },
    },
  },

  animation: `${spin} 1s linear infinite`,
});
