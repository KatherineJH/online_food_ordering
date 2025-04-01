import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../component/state/restaurant/Action";

// const CreateCategory = ({handleClose}) => {
//     const {id}=useParams();
//     const dispatch=useDispatch();
//     const {auth,restaurant}=useSelector(store=>store)
//     const jwt = localStorage.getItem("jwt")

//   const [formData, setFormData] = useState({
//     categoryName: '',
//     restaurantId: '',
//   });

const CreateFoodCategory = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    categoryName: "",
    restaurantId: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.categoryName,
      restaurant: {
        id: 1,
      },
    };
    // dispatch(createCategoryAction({reqData:data, jwt: auth.jwt || jwt}))
    dispatch(createCategoryAction({reqData:data, jwt: localStorage.getItem("jwt")}))
    console.log(data);
    
    setFormData({
      categoryName: '',
      restaurantId: '',
    })
    
    handleClose()
    console.log("Form submitted:", data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=" ">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Category
        </h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <TextField
            label="Category Name"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleInputChange}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategory;
