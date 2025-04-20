import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurantsOrder,
  updateOrderStatus,
} from "../../component/state/adminRestaurantOrder/Action";

const orderStatus = [
  { lable: "Pending", value: "PENDING" },
  { lable: "Completed", value: "COMPLETED" },
  { lable: "On Deliveiry", value: "OUT_FOR_DELIVERY" },
  { lable: "Delivered", value: "DELIVERED" },
];

const OrderTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector((state) => state.restaurant);
  const auth = useSelector((state) => state.auth);
  const adminRestaurantOrder = useSelector(
    (state) => state.adminRestaurantOrder
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId); // 선택된 주문 ID 설정
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null); // 선택된 주문 ID 초기화
  };

  const handleUpdateOrder = (orderStatus) => {
    if (selectedOrderId) {
      dispatch(
        updateOrderStatus({ orderId: selectedOrderId, orderStatus, jwt })
      );
    }
    handleClose();
  };

  // useEffect(() => {
  //   dispatch(
  //     fetchRestaurantsOrder({
  //       restaurantId: restaurant.id,
  //       jwt,
  //     })
  //   );
  // }, []);
  useEffect(() => {
    const restaurantId = restaurant?.usersRestaurant?.id;
    console.log("restaurantId", restaurantId);

    if (restaurantId && jwt) {
      dispatch(
        fetchRestaurantsOrder({
          restaurantId,
          jwt,
        })
      );
    }
  }, [restaurant, jwt]);

  return (
    <Box>
      <Card className="">
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">image</TableCell>
                <TableCell align="right">customer</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">ingredients</TableCell>
                <TableCell align="right">status</TableCell>
                <TableCell align="right">update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminRestaurantOrder.orders.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem) => (
                        <Avatar
                          key={orderItem.id}
                          src={orderItem.food?.images[0]}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item?.customer.fullName}</TableCell>

                  <TableCell align="right">{item?.totalPrice}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <p key={`name-${item.id}-${orderItem.id}`}>
                        {orderItem.food?.name}
                      </p>
                    ))}
                  </TableCell>

                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <div key={orderItem.id}>
                        {orderItem.ingredients.map((ingredient, idx) => (
                          <Chip
                            key={`ingredient-${item.id}-${orderItem.id}-${idx}`}
                            label={ingredient}
                          />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id="demo-positioned-button"
                      aria-controls={open ? "demo-positioned-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleClick(event, item.id)} // orderId 전달
                    >
                      want update
                    </Button>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      // open={open}
                      open={Boolean(anchorEl) && selectedOrderId === item.id} // 선택된 주문 ID와 비교
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem
                          key={status.value}
                          onClick={() => handleUpdateOrder(status.value)} // 상태 업데이트
                        >
                          {status.lable}
                        </MenuItem>
                      ))}
                    </Menu>
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

export default OrderTable;
