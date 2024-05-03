import { ReactElement } from "react";
import { ScroolAreaContainer } from "./styles";

export interface ScroolAreaTypeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
  sizeVertical?: string;
}

export function ScroolArea({
  children,
  sizeVertical = "6rem",
}: ScroolAreaTypeProps) {
  return (
    <ScroolAreaContainer css={{ "--size-vertical": sizeVertical }}>
      <>{children}</>
    </ScroolAreaContainer>
  );
}
