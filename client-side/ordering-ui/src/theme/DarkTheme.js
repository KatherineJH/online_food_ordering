import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#91E63",
    },
    secondary: {
      main: "#5A20CB",
    },
    black: {
      main: "#0D0D0D",
    },
    background: {
      main: "#0000000",
      default: "#0D0D0D",
      paper: "#0D0D0D",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});
