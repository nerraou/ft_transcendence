import type { Preview } from "@storybook/react";
import "@/app/globals.css";

const preview: Preview = {
  globalTypes: {
    darkMode: {
      defaultValue: false,
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
