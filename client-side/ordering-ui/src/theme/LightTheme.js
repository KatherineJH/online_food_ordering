import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#AA00FF",
    },
    secondary: {
      main: "#5A20CB",
    },
    black: {
      main: "#2C2C2C", // 부드러운 밝은 회색 톤 (어두운 테마의 black 대체)
    },
    background: {
      main: "#f5f5dc", // 메인 배경
      default: "#f8ebff", // 기본 배경
      paper: "#F5F5F5", // 종이 배경
    },
    text: {
      primary: "#1A1A1A", // 어두운 텍스트
    },
  },
});
