import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { Navbar } from "./component/navbar/Navbar";
import { DarkTheme } from "./theme/DarkTheme";
import Home from "./component/home/Home";
import MultiItemCarousel from "./component/home/MultiItemCarousel";
import RestaurantDetails from "./component/restaurant/RestaurantDetails";

function App() {
  return (
    <>
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        <Navbar />
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
