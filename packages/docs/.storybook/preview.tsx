import type { Preview } from "@storybook/react";
import React from "react";
import { Decorator } from "@storybook/react";

import { DialogProvider, NotificationProvider } from "@lumus-ui/react"; // Importe seu ThemeProvider aqui

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

const withThemeProvider: Decorator = (Story) => (
  <NotificationProvider>
    <DialogProvider>
      <Story />
    </DialogProvider>
  </NotificationProvider>
);

export const decorators = [withThemeProvider];

export default preview;
