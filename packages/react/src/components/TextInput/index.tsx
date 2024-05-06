import React, { ReactElement, useRef } from "react";
import { generateMask, GenerateMaskProps } from "../../utils/createMasked";
import {
  Caption,
  Input,
  Label,
  Prefix,
  TextInputContainer,
  TextInputWrapper,
} from "./styles";
import { colors } from "@lumus-ui/tokens";
import { Icons, IconsProps } from "../../assets/icons";

export type CaptionType = {
  value: string;
  state: "error" | "info" | "success" | "warning";
};

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  keyId: string;
  label?: string;
  icon?: IconsProps;
  prefixo?: ReactElement | string;
  caption?: CaptionType;
  mask?: GenerateMaskProps | null;
  onActionClick?: Function;
  onChangeValue(value: string): void;
}

export function TextInput({
  keyId,
  icon,
  prefixo,
  label,
  caption,
  mask = null,
  onChangeValue,
  onActionClick,
  ...props
}: TextInputProps) {
  const refInput = useRef<HTMLInputElement>(null);
  const Icon = !!icon ? Icons[icon] : null;

  function addMask(event: React.ChangeEvent<HTMLInputElement>) {
    if (mask) {
      const result = generateMask[mask](event.target.value);

      event.target.value = result.value;
      refInput.current!.maxLength = result.size;
      onChangeValue(result.value);
    } else {
      onChangeValue(event.target.value);
    }
  }

  function typePrefix(): ReactElement {
    if (typeof prefixo === "string") {
      return <Prefix>{prefixo}</Prefix>;
    } else {
      const Pref = prefixo as ReactElement;
      return Pref;
    }
  }

  function clickInputContainer() {
    if (onActionClick) {
      onActionClick();
      refInput.current?.focus();
    }
  }

  return (
    <TextInputWrapper>
      {!!label && <Label htmlFor={keyId}>{label}</Label>}
      <TextInputContainer onClick={clickInputContainer}>
        {!!prefixo && typePrefix()}
        <Input
          id={keyId}
          ref={refInput}
          onChange={(e) => addMask(e)}
          {...props}
        />
        {!!Icon && Icon}
      </TextInputContainer>

      {caption && (
        <Caption
          css={{
            "--state":
              caption.state === "info"
                ? colors.text100
                : caption.state === "success"
                  ? colors.success
                  : caption.state === "warning"
                    ? colors.warning
                    : colors.error,
          }}
        >
          {caption.value}
        </Caption>
      )}
    </TextInputWrapper>
  );
}
