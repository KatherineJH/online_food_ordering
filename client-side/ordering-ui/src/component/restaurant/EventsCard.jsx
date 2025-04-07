import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantEvents } from "../state/restaurant/Action";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const EventsCard = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, restaurant } = useSelector((store) => store);

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
              <Card
                sx={{
                  width: 350,
                  height: 350,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
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
                  <Button size="small">Share</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No events available</Typography>
        )}
      </Grid>
    </div>
  );
};

export default EventsCard;
