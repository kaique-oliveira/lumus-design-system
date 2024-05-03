import * as RadioGroup from "@radix-ui/react-radio-group";
import { styled } from "../../styles";

export const RadioGroupWrapper = styled("div", {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "$2",
  cursor: "pointer",

  label: {
    cursor: "pointer",
  },
});

export const RadioGroupRoot = styled(RadioGroup.Root, {
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const RadioGroupItem = styled(RadioGroup.Item, {
  all: "unset",
  width: "$4",
  height: "$4",
  borderRadius: "100%",
  border: "2px solid $main200",
  cursor: "pointer",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": { filter: "brightness(1)" },

  transition: "all .2s",
});

export const RadioGroupIndicator = styled(RadioGroup.Indicator, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
  transition: "all .2s",
  "&::after": {
    content: '""',
    display: "block",
    width: "$3",
    height: "$3",
    borderRadius: "50%",
    backgroundColor: "$main300",
  },
});

export const Label = styled("label", {
  color: "white",
  fontSize: 15,
  lineHeight: 1,
  paddingLeft: 15,
});
