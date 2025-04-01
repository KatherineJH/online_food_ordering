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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./component/state/authentication/Action";
import { findCart } from "./component/state/cart/Action";
import Routers from "./Routers/Routers";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
  }, [auth.jwt]);
  return (
    <>
      <ThemeProvider theme={DarkTheme}>
        <CssBaseline />
        {/* <Navbar /> */}
        {/* <Home /> */}
        {/* <RestaurantDetails /> */}
        {/* <Cart /> */}
        {/* <Profile /> */}
        <Routers />
      </ThemeProvider>
    </>
  );
}

export default App;
