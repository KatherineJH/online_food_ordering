import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { api } from "./component/config/Api";

const Predict = () => {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [prediction, setPrediction] = useState(""); // 예측 결과 상태

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // 입력 값 업데이트
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      console.log("Sending request to backend:", formData); // 요청 데이터 확인
      const response = await api.post(
        "/predict", // Spring Boot로 요청 보내기
        formData
      );
      console.log("Response from backend:", response.data); // 응답 확인
      setPrediction(response.data.prediction); // 예측 결과 업데이트
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      ); // 에러 로그 확인
      setPrediction("Error fetching prediction");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.default", // DarkTheme의 배경색 적용
        color: "text.primary", // DarkTheme의 텍스트 색상 적용
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Diabetes Prediction
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "300px",
        }}
      >
        <TextField
          type="number"
          name="Pregnancies"
          label="Pregnancies"
          value={formData.Pregnancies}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="number"
          name="Glucose"
          label="Glucose"
          value={formData.Glucose}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="number"
          name="BloodPressure"
          label="Blood Pressure"
          value={formData.BloodPressure}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="number"
          name="SkinThickness"
          label="Skin Thickness"
          value={formData.SkinThickness}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="number"
          name="Insulin"
          label="Insulin"
          value={formData.Insulin}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="number"
          name="BMI"
          label="BMI"
          value={formData.BMI}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="number"
          name="DiabetesPedigreeFunction"
          label="Diabetes Pedigree Function"
          value={formData.DiabetesPedigreeFunction}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="number"
          name="Age"
          label="Age"
          value={formData.Age}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Get Prediction
        </Button>
      </Box>
      <Typography variant="h6" component="p" sx={{ mt: 2 }}>
        Prediction: <strong>{prediction}</strong>
      </Typography>
    </Box>
  );
};

export default Predict;
