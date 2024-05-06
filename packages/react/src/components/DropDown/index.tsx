import { useEffect, useRef, useState } from "react";
import { Text } from "../Text";
import {
  DropDownContainer,
  DropDownOptions,
  DropDownWrapper,
  Label,
} from "./styles";
import { Icons } from "../../assets/icons";
import useTimeoutEffect from "../../hooks/useTimeoutEffect";
import { ScroolArea } from "../ScroolArea";

export type optionProps = {
  value: string | number;
  display: string;
};

export interface DropDownTypeProps {
  keyId: string;
  options: optionProps[];
  placeholder: string;
  onSelectValue(value: string | number): void;
}

export function DropDown({
  options,
  keyId,
  placeholder,
  onSelectValue,
}: DropDownTypeProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [toggle, setToggle] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [searchOption, setSearchOption] = useState("");
  const [optionChoose, setOptionChoose] = useState<optionProps | null>(null);

  function focusDropDown() {
    if (inputRef.current) {
      const isChecked = !inputRef.current.checked;

      inputRef.current.checked = isChecked;

      if (isChecked) {
        setToggle(isChecked);
        setShowOptions(isChecked);
      } else {
        setShowOptions(isChecked);
      }
    }
  }

  function chooseOption(option: optionProps) {
    setOptionChoose(option);
    onSelectValue(option.value);
    setToggle(false);

    if (inputRef.current) {
      inputRef.current.checked = false;
    }
  }

  useTimeoutEffect(
    () => {
      if (showOptions) {
        setToggle(showOptions);
      }
    },
    [showOptions],
    200
  );

  return (
    <DropDownWrapper>
      <Label htmlFor={keyId}>Ingredientes</Label>
      <DropDownContainer
        id={keyId}
        onClick={focusDropDown}
        chosenOption={!!optionChoose}
      >
        <input ref={inputRef} type="checkbox" />
        <Text sizeText="xs">
          {!!optionChoose ? optionChoose.display : placeholder}
        </Text>
        {Icons.arrow_down}
      </DropDownContainer>

      {toggle && (
        <DropDownOptions visible={showOptions}>
          <input
            placeholder="Buscar item"
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          />
          <ScroolArea
            sizeVertical="85px"
            children={
              <>
                {options
                  .filter((x) =>
                    searchOption
                      ? x.display
                          .toLowerCase()
                          .includes(searchOption.toLowerCase())
                      : x
                  )
                  .map((option) => (
                    <Text
                      key={option.value}
                      onClick={() => chooseOption(option)}
                      sizeText="xs"
                    >
                      {option.display}
                    </Text>
                  ))}
              </>
            }
          />
        </DropDownOptions>
      )}
    </DropDownWrapper>
  );
}
