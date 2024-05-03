import { TagContainer } from "./styles";
import { Text } from "../Text";
import { Icons, IconsProps } from "../../assets/icons";
import { useRef, useState } from "react";

export type OptionTypeTag = {
  value: string | number;
  display: string;
};

export interface TagTypeProps {
  keyName: string;
  option: OptionTypeTag;
  icon?: IconsProps;
  onSetChosenTag?(option: OptionTypeTag): void;
}

export function Tag({ option, icon, keyName, onSetChosenTag }: TagTypeProps) {
  const refInput = useRef<HTMLInputElement>(null);
  const IconComponent = !!icon && Icons[icon];

  function focusTag() {
    if (refInput.current && onSetChosenTag) {
      refInput.current.checked = true;
      onSetChosenTag(option);
    }
  }

  return (
    <TagContainer onClick={focusTag}>
      {!!IconComponent && <IconComponent />}
      <Text sizeText="sm">{option.display}</Text>
      <input name={keyName} ref={refInput} type="radio" />
    </TagContainer>
  );
}
