import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import EventIcon from "@mui/icons-material/Event";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState } from "react";
import { Divider, Drawer, useMediaQuery, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../component/state/authentication/Action";
import MenuIcon from "@mui/icons-material/Menu";

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
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleNavigate = (item) => {
    setOpen(false); // 메뉴 클릭 시 사이드바를 닫음
    navigate(`/admin/restaurant${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
    }
  };
  return (
    <div>
      <>
        {/* 작은 화면에서 햄버거 메뉴 버튼 */}
        {isSmallScreen && (
          <IconButton
            onClick={handleToggleSidebar}
            sx={{
              position: "absolute",
              top: "20px",
              left: "20px",
              zIndex: 2,
            }}
          >
            <MenuIcon sx={{ fontSize: "2.5rem" }} />
          </IconButton>
        )}
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          onClose={handleToggleSidebar}
          open={isSmallScreen ? open : true}
          anchor="left"
          sx={{
            zIndex: 1,
            width: isSmallScreen ? "70vw" : "240px", // 작은 화면에서는 사이드바 크기 줄이기
          }}
        >
          <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl pt-16 gap-8">
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
