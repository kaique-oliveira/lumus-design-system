import { ComponentProps, useState } from "react";
import { SwitchThemeContainer, SwitchThemeThumb } from "./styles";
import { Icons } from "../../assets/icons";

export interface SwitchThemeProps
  extends ComponentProps<typeof SwitchThemeContainer> {
  onChangeValue(checked: boolean): void;
}

export function SwitchTheme({ onChangeValue, ...props }: SwitchThemeProps) {
  const [states, setState] = useState(false);

  function change(checked: boolean) {
    onChangeValue(checked);
    setState(checked);
  }

  return (
    <SwitchThemeContainer {...props} onCheckedChange={change}>
      <SwitchThemeThumb>
        {/* {states ? <Icons.moon /> : <Icons.sun />} */}
      </SwitchThemeThumb>
    </SwitchThemeContainer>
  );
}
