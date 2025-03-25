import {
  Divider,
  Card,
  Button,
  Modal,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const style = {
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
  streetAddress: "",
  state: "",
  postalCode: "",
  city: "",
};

const validationSchema = Yup.object({
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State name is required"),
  postalCode: Yup.string().required("Postal code is required"),
  city: Yup.string().required("City name is required"),
});

const items = [1, 1, 1];

const Cart = () => {
  const createOrderUsingSelectedAddress = (selectedItem) => {
    console.log("Selected Address:", selectedItem);
  };
  const handelAddNewAddress = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleSubmit = (values) => {
    console.log("Form Submitted", values);
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w=[30%] space-y-6 lg:min-h-screen pt-10">
          {items.map((item) => (
            <CartItem key={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total(inc VAT)</p>
                <p>₩10500</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>₩5000</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total Price</p>
                <p>₩15500</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w=[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1, 1].map((item, index) => (
                <AddressCard
                  key={index}
                  handelSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationIcon />
                <div className="space-y-3 text-gray-400">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handelAddNewAddress}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Modal Popup */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="streetAddress"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={
                        touched.streetAddress && Boolean(errors.streetAddress)
                      }
                      helperText={
                        touched.streetAddress && errors.streetAddress ? (
                          <span className="text-red-600">
                            {errors.streetAddress}
                          </span>
                        ) : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="state"
                      label="State"
                      fullWidth
                      variant="outlined"
                      error={touched.state && Boolean(errors.state)}
                      helperText={
                        touched.state && errors.state ? (
                          <span className="text-red-600">{errors.state}</span>
                        ) : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="postalCode"
                      label="Postal Code"
                      fullWidth
                      variant="outlined"
                      error={touched.postalCode && Boolean(errors.postalCode)}
                      helperText={
                        touched.postalCode && errors.postalCode ? (
                          <span className="text-red-600">
                            {errors.postalCode}
                          </span>
                        ) : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      fullWidth
                      variant="outlined"
                      error={touched.city && Boolean(errors.city)}
                      helperText={
                        touched.city && errors.city ? (
                          <span className="text-red-600">{errors.city}</span>
                        ) : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      color="primary"
                    >
                      Submit
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
