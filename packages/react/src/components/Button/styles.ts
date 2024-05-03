import { styled } from "../../styles";

export type ButtonTypeStyledProps = "contained" | "outlined" | "text";

export const ButtonContainer = styled("button", {
  all: "unset",

  variants: {
    variant: {
      contained: {
        background: "$main300",
        border: "1.5px solid $main300",

        span: {
          color: "$white",
        },

        svg: {
          path: {
            stroke: "$white",
          },
        },

        "&:not(:disabled):hover": {
          background: "$main400",
          borderColor: "$main400",
        },

        "&:is(:disabled)": {
          background: "$gray200",
          borderColor: "$gray200",

          span: {
            color: "$text100",
          },

          svg: {
            path: {
              stroke: "$text100",
            },
          },
        },
      },
      outlined: {
        border: "1.5px solid $main300",
        backgroundColor: "transparent",

        span: {
          color: "$main300",
        },

        svg: {
          path: {
            stroke: "$main300",
          },
        },

        "&:not(:disabled):hover": {
          borderColor: "$main400",

          span: {
            color: "$main400",
          },

          svg: {
            path: {
              stroke: "$main400",
            },
          },
        },

        "&:is(:disabled)": {
          borderColor: "$text100",

          span: {
            color: "$text100",
          },

          svg: {
            path: {
              stroke: "$text100",
            },
          },
        },
      },
      text: {
        backgroundColor: "transparent",
        border: "1.5px solid transparent",

        padding: "2px",
        height: "max-content",

        span: {
          color: "$main300",
          transition: "all .2s",
        },

        svg: {
          path: {
            stroke: "$main300",
            transition: "all .2s",
          },
        },

        "&:not(:disabled):hover": {
          span: {
            color: "$main400",
          },

          svg: {
            path: {
              stroke: "$main400",
            },
          },
        },
        "&:is(:disabled)": {
          span: {
            color: "$text100",
          },

          svg: {
            path: {
              stroke: "$text100",
            },
          },
        },
      },
    },
  },

  height: "38px",
  maxHeight: "38px",
  // minWidth: "38px",

  padding: "0 9px",

  borderRadius: "$xs",
  cursor: "pointer",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "var(--icon-position)",

  gap: "$1",

  span: {
    fontFamily: "$default",
    fontWeight: "$regular",
    fontSize: "$md",
    lineHeight: "80%",
  },

  defaultVariants: {
    variant: "contained",
  },
});
