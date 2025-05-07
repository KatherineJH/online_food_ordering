import React from "react";

const uploadToCloudinary = async (pics) => {
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "katjh-online-food-ordering");
    data.append("cloud_name", "dfxexupra");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dfxexupra/image/upload`,
      {
        method: "post",
        body: data,
      },
    );

    const fileData = await res.json();
    console.log("url : ", fileData);
    return fileData.url;
  } else {
    console.log("error");
  }
};

export default uploadToCloudinary;
