import { Box, Button, Card, CardHeader, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Modal from "@mui/material/Modal";
import CreateIngredientForm from "./CreateIngredientForm";
import CreateIngredientCategory from "./CreateIngredientCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientsOfRestaurant,
  updateStockOfIngredient,
} from "../../component/state/ingredient/Action";

const orders = [1, 1, 1, 1, 1, 1, 1];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const IngredientsTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector((state) => state.restaurant);
  const ingredient = useSelector((state) => state.ingredient);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const restaurantId = restaurant.usersRestaurant?.id;

    if (!restaurantId) return;

    console.log("Loading ingredients for restaurant", restaurantId);
    dispatch(getIngredientsOfRestaurant({ jwt, id: restaurantId }));
  }, [
    restaurant.usersRestaurant?.id, // re-run when the ID becomes available
    jwt,
    dispatch,
  ]);

  const handleUpdateStock = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };

  return (
    <Box>
      <Card className="mt-1 p-2">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <BorderColorIcon />
            </IconButton>
          }
          title={"Ingredients"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">id</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">category</TableCell>
                <TableCell align="right">availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredient.ingredients.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="right">{item.name}</TableCell>

                  <TableCell align="right">{item.category.name}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleUpdateStock(item.id)}>
                      {item.inStock ? "instock" : "out_of_stock"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientsTable;
