import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";

// props를 구조 분해 할당으로 받도록 수정
const AddressCard = ({ item, showButton, handleSelectAddress, handleOrderComplete }) => {
  return (
    <Card className="flex gap-5 w-64 p-5">
      <HomeIcon />
      <div className="space-y-3">
        <h1 className="font-semibold text-lg">{item.addressName}</h1>
        <p>
          {item.streetAddress},{item.state}, {item.country}, {item.postalCode}
          {/* {`${address?.streetAddress} ${address?.city} ${address?.state} ${address?.zipCode}`} */}
        </p>
        {showButton && (
          <>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleSelectAddress(item)} // item을 전달하여 주소를 선택하도록
            >
              Select
            </Button>

            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => handleOrderComplete(item)} // 주문 완료 처리
            >
              Delivery
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
