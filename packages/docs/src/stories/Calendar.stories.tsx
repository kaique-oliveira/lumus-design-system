import { Meta, StoryObj } from "@storybook/react";
import { Calendar, CalendarTypeProps, Box, Text } from "@lumus-ui/react";
import { useState } from "react";
import { colors } from "@lumus-ui/tokens";

export default {
  title: "Data Display/Calendar",
  component: Calendar,

  argTypes: {
    onDateSelected: {
      description: "Função que recebe a data selecionada.",

      control: {
        type: "text",
        disable: true,
      },
    },
  },

  decorators: [
    (Story) => {
      const [data, setData] = useState(new Date());

      return (
        <Box style={{ width: "250px", background: colors.gray100 }}>
          <Story args={{ onDateSelected: (date) => setData(date) }} />
          <Text style={{ color: colors.main300 }}>
            {data.toLocaleDateString()}
          </Text>
        </Box>
      );
    },
  ],
} as Meta<CalendarTypeProps>;

export const Primary: StoryObj<CalendarTypeProps> = {};
