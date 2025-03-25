import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";

// props를 구조 분해 할당으로 받도록 수정
const AddressCard = ({ item, showButton, handelSelectAddress }) => {
  return (
    <Card className="flex gap-5 w-64 p-5">
      <HomeIcon />
      <div className="space-y-3 text-gray-400">
        <h1 className="font-semibold text-lg text-white">Home</h1>
        <p>14, Seocho-daero 74-gil, Seocho-gu, Seoul, Republic of Korea</p>
        {showButton && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handelSelectAddress(item)}  // item을 전달하여 주소를 선택하도록
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
