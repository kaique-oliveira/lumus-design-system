import { styled } from "../../styles";

export const NotificationContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$4",
  padding: "0 $4",

  minWidth: "250px",
  height: "$12",
  background: "$gray300",
  borderRadius: "$px",
  boxShadow: "rgba(0, 0, 0, 0.10) 1px 1px 6px",

  position: "fixed",
  right: "$4",

  transition: "all .2s",

  variants: {
    state: {
      info: {
        borderLeft: "4px solid $main200",

        svg: {
          path: {
            stroke: "$main200",
          },
        },
      },
      success: {
        borderLeft: "4px solid $success",

        svg: {
          path: {
            stroke: "$success",
          },
        },
      },
      warning: {
        borderLeft: "4px solid $warning",

        svg: {
          path: {
            stroke: "$warning",
          },
        },
      },
      error: {
        borderLeft: "4px solid $error",

        svg: {
          path: {
            stroke: "$error",
          },
        },
      },
    },
    toggleShow: {
      show: {
        opacity: 1,
        bottom: "$4",
      },
      hidden: {
        bottom: "-150px",
        opacity: 0,
      },
    },
  },
});
