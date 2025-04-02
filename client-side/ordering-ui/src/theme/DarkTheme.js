import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF69B4", // 핑크색
    },
    secondary: {
      main: "#5A20CB", // 보라색
    },
    black: {
      main: "#2C2C2C", // 더 밝고 부드러운 검정색
    },
    background: {
      main: "#181818", // 배경을 좀 더 밝은 어두운 색으로 변경
      default: "#212121", // 기본 배경을 조금 더 밝게
      paper: "#2A2A2A", // 종이 색상도 밝게
    },
    text: {
      primary: "#FFFFFF", // 텍스트는 여전히 흰색
    },
  },
});