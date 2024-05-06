import { AvatarImageProps } from "@radix-ui/react-avatar";
import { AvatarContainer, AvatarFallback, AvatarImage } from "./styles";
import { Icons } from "../../assets/icons";

export interface AvatarTypeProps extends AvatarImageProps {}

export function Avatar({
  width = "1rem",
  height = "1rem",
  ...rest
}: AvatarTypeProps) {
  return (
    <AvatarContainer css={{ "--width": width, "--height": height }}>
      <AvatarImage {...rest} />
      <AvatarFallback>{Icons.profile_circle}</AvatarFallback>
    </AvatarContainer>
  );
}
