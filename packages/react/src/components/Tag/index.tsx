import { TagContainer } from './styles';
import { Text } from '../Text';
import { Icons, IconsProps } from '../../assets/icons';
import { useEffect, useRef, useState } from 'react';

export type OptionTypeTag = {
  value: string | number;
  display: string;
};

export interface TagTypeProps {
  keyName: string;
  option: OptionTypeTag;
  icon?: IconsProps;
  iconPosition?: 'left' | 'right';
  value?: string;
  onSetChosenTag?(option: OptionTypeTag): void;
}

export function Tag({
  option,
  value,
  icon,
  iconPosition = 'right',
  keyName,
  onSetChosenTag,
}: TagTypeProps) {
  const refInput = useRef<HTMLInputElement>(null);
  const IconComponent = !!icon && Icons[icon];

  function focusTag() {
    if (refInput.current && onSetChosenTag) {
      refInput.current.checked = true;
      onSetChosenTag(option);
    }
  }

  useEffect(() => {
    if (value && value === option.value) {
      focusTag();
    }
  }, [value]);

  return (
    <TagContainer onClick={focusTag} iconPosition={iconPosition}>
      {!!IconComponent && IconComponent}
      <Text sizeText="sm">{option.display}</Text>
      <input name={keyName} ref={refInput} type="radio" />
    </TagContainer>
  );
}
