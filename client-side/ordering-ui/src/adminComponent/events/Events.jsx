import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  createEventAction,
  getRestaurantEvents,
} from "../../component/state/restaurant/Action";

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
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const Events = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, restaurant } = useSelector((store) => store);

  const [image, setimage] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  const [formValues, setFormValues] = useState(initialValues);

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    // const formattedDate = dayjs(date).isValid() ? dayjs(date).format("MMMM DD, YYYY hh:mm A") : null;
    // setFormValues({ ...formValues, [dateType]: formattedDate });
    const newDate = date ? dayjs(date) : dayjs();
    setFormValues({ ...formValues, [dateType]: newDate });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit: ", formValues);
    dispatch(
      createEventAction({
        data: formValues,
        restaurantId: restaurant.usersRestaurant?.id,
        jwt,
      })
    );
    setFormValues(initialValues);
    handleCloseModal(); // Modal 닫기
  };

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getRestaurantEvents({
          jwt: auth.jwt || jwt,
          restaurantId: restaurant.usersRestaurant?.id,
        })
      );
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* 이벤트 카드 렌더링 */}
      <Grid container spacing={2} justifyContent="center">
        {restaurant.restaurantsEvents?.length > 0 ? (
          restaurant.restaurantsEvents.map((event) => (
            <Grid item key={event.id}>
              <Card sx={{ width: 350, height: 350, display: "flex", flexDirection: "column", height: "100%" }}>
                <CardMedia
                  sx={{ height: 150 }}
                  image={event.image || "https://via.placeholder.com/345x140"} // 이벤트 이미지, 없으면 기본 이미지
                  title={event.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.name}
                  </Typography>
                  {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {event.description || "No description available"}
                  </Typography> */}
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Location: {event.location}
                  </Typography>
                  <Typography variant="body2">
                    Starts:{" "}
                    {dayjs(event.startedAt).format("MMM DD, YYYY hh:mm A")}
                  </Typography>
                  <Typography variant="body2">
                    Ends: {dayjs(event.endsAt).format("MMM DD, YYYY hh:mm A")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" >Share</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No events available</Typography>
        )}
      </Grid>

      <div className="p-5">
        <Button onClick={handleOpenModal} variant="contained">
          Create New Event
        </Button>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="image"
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    value={formValues.image}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="location"
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Event Name"
                    variant="outlined"
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Date and Time"
                      value={
                        formValues.startedAt
                          ? dayjs(formValues.startedAt)
                          : null
                      } // dayjs로 변환
                      // value={formValues.startedAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startedAt")
                      }
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className="w-full"
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="End Date and Time"
                      // value={formValues.endsAt}
                      value={
                        formValues.endsAt ? dayjs(formValues.endsAt) : null
                      } // dayjs로 변환
                      onChange={(newValue) =>
                        handleDateChange(newValue, "endsAt")
                      }
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className="w-full"
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Events;
