import { Check } from "phosphor-react";
import {
  CheckboxContainer,
  CheckboxIndicator,
  CheckboxWrapper,
} from "./styles";

import { Label } from "../Label";
import { CheckboxProps } from "@radix-ui/react-checkbox";

export interface CheckboxTypeProps extends CheckboxProps {
  keyId: string;
  label: string;
}

export function Checkbox({ keyId, label, ...rest }: CheckboxTypeProps) {
  return (
    <CheckboxWrapper>
      <CheckboxContainer id={keyId} {...rest}>
        <CheckboxIndicator asChild>
          <Check weight="bold" />
        </CheckboxIndicator>
      </CheckboxContainer>

      <Label sizeText={"sm"} htmlFor={keyId}>
        {label}
      </Label>
    </CheckboxWrapper>
  );
}
