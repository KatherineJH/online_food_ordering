import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { Navbar } from "./component/navbar/Navbar";
import { DarkTheme } from "./theme/DarkTheme";
import Home from "./component/home/Home";
import RestaurantDetails from "./component/restaurant/RestaurantDetails";
import Cart from "./component/cart/Cart";
import Profile from "./component/profile/Profile";
import CustomerRouter from "./Routers/CustomerRouter";
import Auth from "./component/auth/Auth";

function App() {
  return (
    <>
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        {/* <Navbar /> */}
        {/* <Home /> */}
        {/* <RestaurantDetails /> */}
        {/* <Cart /> */}
        {/* <Profile /> */}
        <CustomerRouter />
      </ThemeProvider>
    </>
  );
}

export default App;
