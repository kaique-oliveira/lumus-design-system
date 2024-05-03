import type { StoryObj, Meta } from "@storybook/react";
import {
  Box,
  ScroolArea,
  ScroolAreaTypeProps,
  Text,
  optionProps,
} from "@lumus-ui/react";

export default {
  title: "Surfaces/Scrool Area",
  component: ScroolArea,

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

      return (
        <Box style={{ width: "100px", height: "100px" }}>
          <Story
            args={{
              children: (
                <>
                  {fruts.map((f) => (
                    <Text key={f.value}>{f.display}</Text>
                  ))}
                </>
              ),
            }}
          />
        </Box>
      );
    },
  ],
} as Meta<ScroolAreaTypeProps>;

export const Default: StoryObj<ScroolAreaTypeProps> = {
  args: {
    sizeVertical: "100px",
  },
};
