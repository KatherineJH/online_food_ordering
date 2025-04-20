import { Box, Card, CardHeader, IconButton, Modal } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CreateIngredientCategory from "./CreateIngredientCategory";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientCategory } from "../../component/state/ingredient/Action";

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

const IngredientCategoryTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant);
  const ingredient = useSelector((state) => state.ingredient);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    const restaurantId = restaurant.usersRestaurant?.id;

    // don’t dispatch until we actually know the ID
    if (!restaurantId) return;

    console.log("Loading ingredient categories for restaurant", restaurantId);
    dispatch(getIngredientCategory({ id: restaurantId, jwt }));
  }, [
    restaurant.usersRestaurant?.id, // re-run when ID arrives
    jwt,
    dispatch,
  ]);
  return (
    <Box>
      <Card className="mt-1 p-2">
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <BorderColorIcon />
            </IconButton>
          }
          title={"Ingredient Category"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">id</TableCell>
                <TableCell align="left">name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredient.category.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
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
          <CreateIngredientCategory />
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientCategoryTable;
