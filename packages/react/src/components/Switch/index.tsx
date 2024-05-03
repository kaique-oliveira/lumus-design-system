import { SwitchContainer, SwitchThumb, SwitchWrapper } from "./styles";
import { Icons, IconsProps } from "../../assets/icons";
import { SwitchProps } from "@radix-ui/react-switch";
import { Label } from "../Label";

export interface SwitchTypeProps extends SwitchProps {
  keyId: string;
  icon?: IconsProps;
  label?: string;
}

export function Switch({ keyId, label = "", icon, ...props }: SwitchTypeProps) {
  const IconComponent = !!icon && Icons[icon];

  return (
    <SwitchWrapper>
      <SwitchContainer id={keyId} {...props}>
        <SwitchThumb>{!!IconComponent && <IconComponent />}</SwitchThumb>
      </SwitchContainer>

      <Label sizeText={"sm"} htmlFor={keyId}>
        {label}
      </Label>
    </SwitchWrapper>
  );
}
