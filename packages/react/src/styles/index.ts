import {
  colors,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  radii,
  space,
} from "@lumus-ui/tokens";
import { createStitches, defaultThemeMap } from "@stitches/react";

export const { styled, css, globalCss, keyframes, theme, createTheme, config } =
  createStitches({
    themeMap: {
      ...defaultThemeMap,
      height: "space",
      width: "space",
    },
    theme: {
      colors,
      fontSizes,
      fontWeights,
      fonts,
      radii,
      lineHeights,
      space,
    },
  });
