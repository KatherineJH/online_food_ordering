import {
  Divider,
  Card,
  Button,
  Modal,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../state/order/Action";
import { findCart } from "../state/cart/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  addressName: "",
  streetAddress: "",
  state: "",
  postalCode: "",
  city: "",
};

const validationSchema = Yup.object({
  addressName: Yup.string().required("Address name is required"),
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State name is required"),
  postalCode: Yup.string().required("Postal code is required"),
  city: Yup.string().required("City name is required"),
});

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { cartItems, cart: cartData } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) dispatch(findCart(token));
  }, [dispatch]);

  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cartItems?.[0]?.food?.restaurant?.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          addressName: values.addressName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: "South Korea",
        },
      },
    };
    dispatch(createOrder(data));
  };

  const handleOrderComplete = (selectedAddress) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cartItems?.[0]?.food?.restaurant?.id,
        deliveryAddress: {
          id: selectedAddress.id,
          fullName: auth.user?.fullName,
          addressName: selectedAddress.addressName,
          streetAddress: selectedAddress.streetAddress,
          city: selectedAddress.city,
          state: selectedAddress.state,
          postalCode: selectedAddress.postalCode,
          country: selectedAddress.country,
        },
      },
    };
    dispatch(createOrder(data));
  };

  const handleAddNewAddress = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cartItems?.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p>Item Total (inc VAT)</p>
                <p>₩{cartData?.total || 0}</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>₩5000</p>
              </div>
              <Divider />
              <div className="flex justify-between">
                <p>Total Price</p>
                <p>₩{(cartData?.total || 0) + 5000}</p>
              </div>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {auth.user?.addresses.map((item, index) => (
                <AddressCard
                  key={item.id || index}
                  item={item}
                  handelSelectAddress={() => {}}
                  handleOrderComplete={handleOrderComplete}
                  showButton={true}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationIcon />
                <div className="space-y-3">
                  <h1 className="font-semibold text-lg">
                    Delivery to New Address
                  </h1>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleAddNewAddress}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  {Object.entries(initialValues).map(([key]) => (
                    <Grid item xs={12} key={key}>
                      <Field
                        as={TextField}
                        name={key}
                        label={key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                        fullWidth
                        variant="outlined"
                        error={touched[key] && Boolean(errors[key])}
                        helperText={
                          touched[key] && errors[key] ? (
                            <span className="text-red-600">{errors[key]}</span>
                          ) : null
                        }
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      color="primary"
                    >
                      Delivery & Transaction
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
