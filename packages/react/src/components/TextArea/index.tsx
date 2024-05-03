import React, { useRef } from "react";
import { generateMask, GenerateMaskProps } from "../../utils/createMasked";
import {
  Caption,
  Area,
  Label,
  TextAreaContainer,
  TextAreaWrapper,
} from "./styles";
import { colors } from "@lumus-ui/tokens";
import { CaptionType } from "../TextInput";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  keyId: string;
  label: string;
  caption?: CaptionType;
  onChangeValue(value: string): void;
}

export function TextArea({
  keyId,
  label,
  caption,
  onChangeValue,
  ...props
}: TextAreaProps) {
  const refInput = useRef<HTMLTextAreaElement>(null);

  return (
    <TextAreaWrapper>
      <Label htmlFor={keyId}>{label}</Label>
      <TextAreaContainer>
        <Area id={keyId} ref={refInput} {...props} />
      </TextAreaContainer>
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
    </TextAreaWrapper>
  );
}
