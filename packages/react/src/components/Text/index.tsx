import { styled } from "../../styles";
import { TextContainer } from "./styles";

export interface TextTypeProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  sizeText?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl";
}

export function Text({ sizeText = "sm", children, ...rest }: TextTypeProps) {
  return (
    <TextContainer size={sizeText} {...rest}>
      {children}
    </TextContainer>
  );
}
