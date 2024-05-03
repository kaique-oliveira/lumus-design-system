import type { StoryObj, Meta } from "@storybook/react";
import {
  Box,
  DropDown,
  DropDownTypeProps,
  Text,
  optionProps,
} from "@lumus-ui/react";
import { useEffect, useState } from "react";

export default {
  title: "Form/DropDown",
  component: DropDown,

  args: {
    disabled: false,
  },

  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
  },

  decorators: [
    (Story) => {
      const fruts: optionProps[] = [
        { value: 1, display: "Uva" },
        { value: 2, display: "Abacate" },
        { value: 3, display: "Banana" },
        { value: 4, display: "Maçã" },
        { value: 5, display: "Pera" },
        { value: 6, display: "Melância" },
      ];
      const [frutIdSelected, setFrutIdSelected] = useState<string | number>("");
      const [fruta, setFruta] = useState<optionProps | null>(null);

      useEffect(() => {
        if (frutIdSelected) {
          const f = fruts.find(
            (x) => Number(x.value) == Number(frutIdSelected)
          );
          setFruta(f!);
        }
      }, [frutIdSelected]);

      return (
        <Box style={{ width: "300px", background: "transparent" }}>
          <Story
            args={{
              placeholder: "Selecione uma fruta",
              onSelectValue: setFrutIdSelected,
              options: fruts,
            }}
          />

          <Text>{fruta?.display}</Text>
        </Box>
      );
    },
  ],
} as Meta<DropDownTypeProps>;

export const Default: StoryObj<DropDownTypeProps> = {
  args: {
    keyId: "fruts",
  },
};
