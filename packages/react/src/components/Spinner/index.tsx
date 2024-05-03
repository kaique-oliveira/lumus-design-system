import { SpinnerContainer, Spi } from "./styles";

export interface SpinnerTypeProps {
  sizeSpinner?: "small" | "medium" | "large";
}

export function Spinner({ sizeSpinner = "small" }: SpinnerTypeProps) {
  return (
    <SpinnerContainer>
      <Spi sizeSpinner={sizeSpinner} />
    </SpinnerContainer>
  );
}
