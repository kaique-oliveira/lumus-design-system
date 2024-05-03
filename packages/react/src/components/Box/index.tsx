import { ComponentProps, ReactElement } from "react";
import { BoxContainer } from "./styles";

export interface BoxTypeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Box({ ...props }: BoxTypeProps) {
  return <BoxContainer {...props} />;
}
