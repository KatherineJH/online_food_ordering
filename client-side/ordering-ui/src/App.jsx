import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { Navbar } from "./component/navbar/Navbar";
import { DarkTheme } from "./theme/DarkTheme";
import Home from "./component/home/Home";
import RestaurantDetails from "./component/restaurant/RestaurantDetails";
import Cart from "./component/cart/Cart";

function App() {
  return (
    <>
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        <Navbar />
        {/* <Home /> */}
        {/* <RestaurantDetails /> */}
        <Cart />
      </ThemeProvider>
    </>
  );
}

export default App;
