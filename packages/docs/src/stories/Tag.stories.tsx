import type { StoryObj, Meta } from "@storybook/react";
import { Box, OptionTypeTag, Tag, TagTypeProps, Text } from "@lumus-ui/react";
import { useState } from "react";
import { colors } from "@lumus-ui/tokens";

export default {
  title: "Form/Tags",
  component: Tag,

  decorators: [
    (Story) => {
      const [tagSelected, setTagSelected] = useState<OptionTypeTag | null>(
        null
      );

      return (
        <Box
          style={{ width: "100px", height: "100px", background: "transparent" }}
        >
          <Story
            args={{
              option: { value: 1, display: "Banana" },
              keyName: "fruta",
              onSetChosenTag: setTagSelected,
            }}
          />

          <Story
            args={{
              option: { value: 2, display: "Manga" },
              keyName: "fruta",
              onSetChosenTag: setTagSelected,
            }}
          />

          <Text style={{ color: colors.main200 }}>{tagSelected?.display}</Text>
        </Box>
      );
    },
  ],
} as Meta<TagTypeProps>;

export const Default: StoryObj<TagTypeProps> = {};
