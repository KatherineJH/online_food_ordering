import React from "react";
import { useSelector } from "react-redux";
import AddressCard from "../cart/AddressCard";

const Address = () => {
  const { auth } = useSelector((state) => state);
  return (
    <div>
      <div className="flex items-center flex-col lg:px-10">
        <h1 className="text-xl text-center py-7 font-semibold">Addresses</h1>
        <div className="flex gap-5 flex-wrap justify-center">
          {auth.user?.addresses.map((item, index) => (
            <AddressCard
              key={index}
              item={item}
              showButton={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Address;
