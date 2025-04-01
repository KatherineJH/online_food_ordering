import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const CreateIngredientCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    restaurantId: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.name,
      restaurant: {
        id: 1,
      },
    };
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
          Create Ingredient Category
        </h1>
        <form className="space-y-5" onSubmit={handleFormSubmit}>
          <TextField
            label="Ingredient Category"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Create Ingredient Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategory;
