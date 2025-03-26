import React from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Button } from "@mui/material";

const UserProfile = () => {
    const handleLogout = () => {

    }
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center justify-center">
        <PersonPinIcon sx={{ fontSize: "9rem" }} />
        <h1 className="py-5 text-2xl font-semibold">Katherine Junghyun</h1>
        <p>Email: katherine.junghyun@outlook.com</p>
        <Button variant="contained" onClick={handleLogout} sx={{margin:"2rem 0rem"}}>Log Out</Button>
      </div>
    </div>
  );
};

export default UserProfile;
