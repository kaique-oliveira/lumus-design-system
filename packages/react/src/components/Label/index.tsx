import { LabelContainer } from "./styles";

export interface LabelTypeProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  sizeText?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
}

export function Label({ children, sizeText = "sm", ...rest }: LabelTypeProps) {
  return (
    <LabelContainer size={sizeText} {...rest}>
      {children}
    </LabelContainer>
  );
}
