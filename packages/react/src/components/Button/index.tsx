import React, {
  ReactElement,
  isValidElement,
  useEffect,
  useState,
} from "react";
import { Icons, type IconsProps } from "../../assets/icons";
import { ButtonContainer, ButtonTypeStyledProps } from "./styles";

export interface ButtonTypeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconsProps | ReactElement;
  iconPosition?: "right" | "left";
  label?: string;
  variant?: ButtonTypeStyledProps;
}

export function Button({
  label,
  icon,
  variant = "contained",
  iconPosition = "right",
  ...props
}: ButtonTypeProps) {
  const [IconComponent, setIconComponent] = useState<ReactElement | null>(null);

  function convertIcon() {
    if (icon && !isValidElement(icon)) {
      setIconComponent(Icons[icon as IconsProps]);
    } else if (icon && isValidElement(icon)) {
      setIconComponent(icon);
    } else {
      setIconComponent(null);
    }
  }

  useEffect(() => {
    convertIcon();
  }, []);

  return (
    <ButtonContainer
      {...props}
      variant={variant}
      css={{
        "--icon-position": iconPosition === "right" ? "row-reverse" : "row",
      }}
    >
      {!!IconComponent && IconComponent}
      {!!label && <span>{label}</span>}
    </ButtonContainer>
  );
}
