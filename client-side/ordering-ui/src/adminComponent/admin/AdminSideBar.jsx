import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import EventIcon from "@mui/icons-material/Event";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../component/state/authentication/Action";

const menu = [
  {
    title: "Dashboard",
    icon: <SpaceDashboardIcon />,
    path: "/",
  },
  {
    title: "Orders",
    icon: <ShoppingBagIcon />,
    path: "/orders",
  },
  {
    title: "Menu",
    icon: <MenuBookIcon />,
    path: "/menu",
  },
  {
    title: "Food Category",
    icon: <CategoryIcon />,
    path: "/category",
  },
  {
    title: "Ingredients",
    icon: <BrunchDiningIcon />,
    path: "/ingredients",
  },
  {
    title: "Events",
    icon: <EventIcon />,
    path: "/event",
  },
  {
    title: "Details",
    icon: <SupervisorAccountIcon />,
    path: "/details",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    path: "/",
  },
];

const AdminSideBar = () => {
  // media query는 side bar에 적용, 작은 화면에서 side bar를 열고 닫는 것은 Admin.jsx에서 함.
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {};
  const handleNavigate = (item) => {
    navigate(`/admin/restaurant${item.path}`);
    if (item.title == "Logout") {
      navigate("/");
      dispatch(logout());
    }
  };
  return (
    <div>
      <>
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          onClose={handleClose}
          open={true}
          anchor="left"
          sx={{ zIndex: 1 }}
        >
          <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
            {menu.map((item, i) => (
              <>
                <div
                  onClick={() => handleNavigate(item)}
                  className="px-5 flex items-center gap-5 cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {i !== menu.length - 1 && <Divider />}
              </>
            ))}
          </div>
        </Drawer>
      </>
    </div>
  );
};

export default AdminSideBar;
