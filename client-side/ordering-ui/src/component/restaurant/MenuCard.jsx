import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { categorizedIngredients } from "../utils/CategorizeIngredient";
import { addItemToCart } from "../state/cart/Action";

const demo = [
  { category: "Nuts & Seeds", ingredients: ["Cashews"] },
  { category: "Protein", ingredients: ["Ground Beef", "Bacon strips"] },
];

const MenuCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleCheckboxChange = (itemName) => {
    // console.log("value", itemName);
    if (selectedIngredients.includes(itemName)) {
      console.log("yes");
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      console.log("no");
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  const handleAddItemToCart = (e) => {
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    console.log("reqData", reqData.cartItem);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt=""
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>₩ {item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorizedIngredients(item.ingredients))?.map(
              (category) => (
                <div>
                  <p>{category}</p>
                  <FormGroup>
                    {categorizedIngredients(item?.ingredients)[category].map(
                      (ingredient, index) => (
                        <FormControlLabel
                          key={ingredient.name}
                          control={
                            <Checkbox
                              checked={selectedIngredients.includes(
                                ingredient.name
                              )}
                              onChange={() =>
                                handleCheckboxChange(ingredient.name)
                              }
                            />
                          }
                          label={ingredient.name}
                        />
                      )
                    )}
                  </FormGroup>
                </div>
              )
            )}
          </div>
          <div className="pt-5">
            <Button
              // onClick={handleAddItemToCart}
              variant="contained"
              disabled={false}
              type="submit"
            >
              {true ? "Add to Cart" : "Out Of Stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;

// const MenuCard = ({ item }) => {
//   const dispatch = useDispatch();
//   const [selectedIngredients, setSelectedIngredients] = useState([]);

//   // useEffect(() => {
//   //   console.log("Updated selectedIngredients:", selectedIngredients);
//   // }, [selectedIngredients]);

//   const handleCheckboxChange = (itemName) => {
//     // console.log("Checkbox clicked for:", itemName);
//     setSelectedIngredients((prevSelectedIngredients) => {
//       const isSelected = prevSelectedIngredients.includes(itemName);
//       // console.log("Previous state:", prevSelectedIngredients);
//       // console.log("Item name:", itemName);
//       // console.log("Is selected:", isSelected);

//       if (isSelected) {
//         console.log("Removing item:", itemName);
//         return prevSelectedIngredients.filter((item) => item !== itemName);
//       } else {
//         console.log("Adding item:", itemName);
//         return [...prevSelectedIngredients, itemName];
//       }
//     });
//   };

//   const handleAddItemToCart = (e) => {
//     e.preventDefault();

//     // 로그로 id 값을 확인
//     console.log("Menu Item ID:", item.id);

//     // id가 null 혹은 undefined일 경우 처리
//     if (!item.id) {
//       console.log("Item ID is missing!");
//       return;
//     }

//     const reqData = {
//       token: localStorage.getItem("jwt"),
//       cartItem: {
//         foodId: item.id,
//         quantity: 1,
//         ingredients: selectedIngredients,
//       },
//     };

//     console.log("reqData", reqData); // 요청 데이터 로그 확인

//     dispatch(addItemToCart(reqData));
//   };

//   return (
//     <Accordion>
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1-content"
//         id="panel1-header"
//       >
//         <div className="lg:flex items-center justify-between">
//           <div className="lg:flex items-center lg:gap-5">
//             <img
//               className="w-[7rem] h-[7rem] object-cover"
//               src={item.images[0]}
//               alt=""
//             />
//             <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
//               <p className="font-semibold text-xl">{item.name}</p>
//               <p>₩ {item.price}</p>
//               <p className="text-gray-400">{item.description}</p>
//             </div>
//           </div>
//         </div>
//       </AccordionSummary>
//       <AccordionDetails>
//         <form onSubmit={handleAddItemToCart}>
//           <div className="flex gap-5 flex-wrap">
//             {Object.keys(categorizedIngredients(item.ingredients))?.map(
//               (category) => (
//                 <div key={category}>
//                   <p>{category}</p>
//                   <FormGroup>
//                     {categorizedIngredients(item?.ingredients)[category].map(
//                       (ingredient) => (
//                         <FormControlLabel
//                           key={ingredient.name}
//                           control={
//                             <Checkbox
//                               checked={selectedIngredients.includes(
//                                 ingredient.name
//                               )}
//                               onChange={() =>
//                                 handleCheckboxChange(ingredient.name)
//                               }
//                             />
//                           }
//                           label={ingredient.name}
//                         />
//                       )
//                     )}
//                   </FormGroup>
//                 </div>
//               )
//             )}
//           </div>
//           <div className="pt-5">
//             <Button variant="contained" disabled={false} type="submit">
//               {true ? "Add to Cart" : "Out Of Stock"}
//             </Button>
//           </div>
//         </form>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export default MenuCard;
