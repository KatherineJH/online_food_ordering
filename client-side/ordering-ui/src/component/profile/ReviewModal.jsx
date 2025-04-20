import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

const ReviewModal = ({ open, onClose }) => {
  const { orderReview } = useSelector((state) => state.order);
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-white p-5 rounded-md shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-3">
          <Typography variant="h6">📝 작성된 리뷰</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="body1" gutterBottom>
          {orderReview?.content || "내용 없음"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          평점: {orderReview?.rating ?? "N/A"} / 5
        </Typography>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
