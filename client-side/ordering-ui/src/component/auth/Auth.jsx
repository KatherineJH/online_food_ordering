import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { style } from "../cart/Cart";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleOnClose = () => {
    navigate("/");
  };

  return (
    <>
      <Modal
        onClose={handleOnClose}
        open={
          // true
          location.pathname === "/account/register" ||
          location.pathname === "/account/login"
        }
      >
        <Box sx={style}>{location.pathname === "/account/register"?<RegisterForm/>:<LoginForm/>}</Box>
      </Modal>
    </>
  );
};

export default Auth;
