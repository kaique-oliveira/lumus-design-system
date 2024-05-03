import { SeparatorContainer } from "./styles";

export interface SeparatorTypeProps {
  orientation: "vertical" | "horizontal";
  widthSize?: string;
  heightSize?: string;
}

export function Separator({
  orientation,
  widthSize = ".5px",
  heightSize = ".5px",
}: SeparatorTypeProps) {
  return (
    <SeparatorContainer
      css={{ "--width-size": widthSize, "--height-size": heightSize }}
      orientation={orientation}
    ></SeparatorContainer>
  );
}
