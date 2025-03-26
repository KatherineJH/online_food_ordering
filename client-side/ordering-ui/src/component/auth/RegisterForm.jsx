import { Button, Select, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

const RegisterForm = () => {
  const handleSubmit = (values) => {
    console.log("Form values: ", values);
  };
  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h5" className="text-center">
        Register
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <Field
            fullWidth
            margin="normal"
            as={Select}
            labelId="role-simple-select-label"
            id="role-simple-select"
            name="role"
            // value={role}
            label="role"
            // onChange={handleChange}
          >
            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>
              Restaurant Owner
            </MenuItem>
          </Field>

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </Form>
      </Formik>
      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Registered Already?
      </Typography>
      <div className="flex justify-center mt-4">
        <Button
          size="medium"
          align="center"
          onClick={() => navigate("/account/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
