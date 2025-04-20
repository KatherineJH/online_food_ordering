import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { LightTheme } from "./theme/LightTheme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./component/state/authentication/Action";
import { findCart } from "./component/state/cart/Action";
import Routers from "./Routers/Routers";
import { getRestaurantByUserId } from "./component/state/restaurant/Action";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
  }, [auth.jwt]);

  useEffect(() => {
    if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
      dispatch(getRestaurantByUserId(auth.jwt || jwt));
    }
  }, [auth.user]);

  return (
    <>
      <ThemeProvider theme={LightTheme}>
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
