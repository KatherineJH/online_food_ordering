import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from "react";

const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg"
        />
        <CardContent>
          <Typography variant="h6">
            Select any Seafood plate
          </Typography>
          <Typography variant="body1">
          Get free salad 
          </Typography>
          <div className="py-2 space-y-2">
            <p>{"Gangnam"}</p>
            <p className="text-sm text-blue-300">April 15, 2024 12:00 AM</p>
            <p className="text-sm text-red-400">April 20, 2024 12:00 AM</p>
          </div>
        </CardContent>
        <CardActions>
            <IconButton>
                <DeleteOutlineIcon />
            </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default EventCard;
