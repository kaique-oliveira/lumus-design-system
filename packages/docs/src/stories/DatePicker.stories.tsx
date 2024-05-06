import { Meta, StoryObj } from "@storybook/react";
import { DatePicker, DatePickerTypeProps, Box, Text } from "@lumus-ui/react";
import { useState } from "react";
import { colors } from "@lumus-ui/tokens";

export default {
  title: "Form/DatePicker",
  component: DatePicker,

  decorators: [
    (Story) => {
      const [data, setData] = useState(new Date());

      return (
        <Box style={{ width: "250px", background: "transparent" }}>
          <Story
            args={{
              keyId: "nascimento",
              label: "Data de nascimento",

              onSelectedDate(date) {
                setData(date);
              },
            }}
          />
          <Text style={{ color: colors.main200 }}>
            {data.toLocaleDateString()}
          </Text>
        </Box>
      );
    },
  ],
} as Meta<DatePickerTypeProps>;

export const Primary: StoryObj<DatePickerTypeProps> = {};
