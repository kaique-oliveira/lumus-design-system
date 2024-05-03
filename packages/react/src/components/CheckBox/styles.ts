import * as Checkbox from "@radix-ui/react-checkbox";
import { styled } from "../../styles";

export const CheckboxWrapper = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "$2",
  cursor: "pointer",

  label: {
    cursor: "pointer",
  },
});

export const CheckboxContainer = styled(Checkbox.Root, {
  all: "unset",
  width: "$4",
  height: "$4",
  borderRadius: "6px",
  lineHeight: 0,
  cursor: "pointer",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid $main200",

  transition: "all .2s",

  '&[data-state="checked"]': {
    backgroundColor: "$main300",
    borderColor: "$main300",
  },

  "&:focus": {
    border: "2px solid $main200",
  },

  "&:disabled": {
    borderColor: "$gray200",
    background: "$gray300",

    "& ~ label": {
      color: "$text100",
    },
  },

  '&[data-state="checked"]:disabled': {
    backgroundColor: "$gray200",

    svg: {
      color: "$gray100",
    },
  },
});

export const CheckboxIndicator = styled(Checkbox.Indicator, {
  width: "$3",
  height: "$3",
  color: "$white",
});
