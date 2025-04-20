import { Avatar, Box, Card, CardHeader, Chip, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
} from "../../component/state/menu/Action";

const MenuTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector((state) => state.restaurant);
  const ingredient = useSelector((state) => state.ingredient);
  const menu = useSelector((state) => state.menu);
  const navigate = useNavigate();

  useEffect(() => {
    const restaurantId = restaurant.usersRestaurant?.id;

    if (!restaurantId) {
      return;
    }

    console.log("Restaurant ID is now:", restaurantId);

    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId,
        vegetarian: false,
        nonVegetarian: false,
        seasonal: false,
        foodCategory: "",
      })
    );
  }, [
    restaurant.usersRestaurant?.id, // ← re-run when the ID becomes defined
    jwt, // ← in case your auth token changes
    dispatch, // ← best practice for hooks
  ]);

  const handleDeleteFood = (foodId) => {
    console.log("Handling delete for food ID:", foodId); // Check if this log shows up
    dispatch(deleteFoodAction({ foodId, jwt }));
  };

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurant/add-menu")}
              aria-label="settings"
            >
              <BorderColorIcon />
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">image</TableCell>
                <TableCell align="right">title</TableCell>
                <TableCell align="right">ingredients</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">availability</TableCell>
                <TableCell align="right">delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src={item.images[0]} />
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>

                  <TableCell align="right">
                    {item.ingredients.map((ing) => (
                      <Chip
                        key={ing.id ?? ing.name} // use a stable id if you have one
                        label={ing.name}
                        size="small"
                        sx={{ margin: "2px" }}
                      />
                    ))}
                  </TableCell>
                  <TableCell align="right">₩ {item.price}</TableCell>
                  <TableCell align="right">
                    {item.available ? "instock" : "out of stock"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteFood(item.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default MenuTable;
