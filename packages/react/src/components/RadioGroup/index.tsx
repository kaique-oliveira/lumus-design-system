import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { Label } from "../Label";
import {
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupRoot,
  RadioGroupWrapper,
} from "./styles";

export type OptionRadio = {
  value: string;
  label: string;
};

export interface RadioGroupTypeProps extends RadioGroupProps {
  options: OptionRadio[];
}

export function RadioGroup({ options, ...rest }: RadioGroupTypeProps) {
  return (
    <RadioGroupRoot {...rest}>
      {options.map((option) => (
        <RadioGroupWrapper key={option.label}>
          <RadioGroupItem id={option.value} value={option.value}>
            <RadioGroupIndicator />
          </RadioGroupItem>
          <Label sizeText={"sm"} htmlFor={option.value}>
            {option.label}
          </Label>
        </RadioGroupWrapper>
      ))}
    </RadioGroupRoot>
  );
}
