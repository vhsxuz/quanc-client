import { extendTheme } from "@chakra-ui/react";
import '@fontsource/lexend/index.css';

const theme = extendTheme({
  colors: {
    blue: {
      100: "#32B2DF",
      200: "#2C74B3",
      300: "#205295",
      400: "#144272",
      450: "#133d6a",
      500: "#002E57",
      600: "#0A2647",
      700: "#0A2342"
    },
    cyan: {
      100: "#00FFFC",
    },
    background: {
      default: "#0A2647"
    },
  },
  fonts: {
    heading: 'Lexend',
    body: 'Lexend',
  },
});

export default theme;