import React, {
  ReactElement,
  forwardRef,
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

export const Button = forwardRef<HTMLButtonElement, ButtonTypeProps>(
  function Button(
    { label, icon, variant = "contained", iconPosition = "right", ...props },
    ref
  ) {
    const [IconComponent, setIconComponent] = useState<ReactElement | null>(
      null
    );

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
    }, [icon]);

    return (
      <ButtonContainer
        ref={ref}
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
);
