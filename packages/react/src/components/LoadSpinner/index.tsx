import { LoadContainer, Spinner } from "./styles";

export interface LoadSpinnerTypeProps {
  sizeSpinner?: "small" | "large";
}

export function LoadSpinner({ sizeSpinner = "small" }: LoadSpinnerTypeProps) {
  return (
    <LoadContainer>
      <Spinner sizeSpinner={sizeSpinner} />
    </LoadContainer>
  );
}
