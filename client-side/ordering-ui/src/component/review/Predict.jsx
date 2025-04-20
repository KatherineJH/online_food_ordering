
/**
 * 리뷰 페이지
 * 고객이 리뷰를 남기기만 하면, ML 예측 모델이 리뷰를 분석하여 백분위 점수와 Positive/Negative 를 분류.
 */
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { api } from "../config/Api";

const Predict = () => {
  const location = useLocation();
  const { orderId, restaurantId } = location.state || {};

  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("JWT 토큰이 없습니다. 로그인해주세요.");
      }

      const response = await api.post(
        "/predict",
        {
          review,
          restaurantId,
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error("Prediction Error:", error);
      setResult({ prediction: "Error", probability: null });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        리뷰를 남겨주세요!
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", maxWidth: 600 }}
      >
        <TextField
          label="리뷰를 입력하세요"
          multiline
          rows={4}
          fullWidth
          value={review}
          onChange={(e) => setReview(e.target.value)}
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          리뷰 남기기
        </Button>
      </Box>

      {result && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">
            예측 결과: <strong>{result.prediction}</strong>
          </Typography>
          {result.confidence !== null && (
            <Typography variant="body1">
              신뢰도: {parseFloat(result.confidence).toFixed(2)}%
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Predict;
