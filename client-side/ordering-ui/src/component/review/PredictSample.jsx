/**
 * 테스트용 ML 예측 페이지
 * 리뷰를 입력하면 결과만 예측하고 저장은 하지 않음
 */
import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";

const PredictSample = () => {
  const [review, setReview] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
         `${import.meta.env.VITE_SERVER_URL}/predict/test`, // 테스트 전용 엔드포인트
        {
          review,
        }
      ); // 테스트 전용 엔드포인트
      setResult(response.data);
    } catch (error) {
      console.error("Prediction Error:", error);
      setResult({ prediction: "Error", confidence: null });
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
        ML 모델 테스트 (리뷰 저장 안됨)
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
          예측하기
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

export default PredictSample;

// // 테스트 페이지
// import React, { useState } from "react";
// import { Box, Button, TextField, Typography } from "@mui/material";
// import { api } from "../config/Api";

// const Predict = () => {
//   const [formData, setFormData] = useState({
//     Pregnancies: "",
//     Glucose: "",
//     BloodPressure: "",
//     SkinThickness: "",
//     Insulin: "",
//     BMI: "",
//     DiabetesPedigreeFunction: "",
//     Age: "",
//   });

//   const [prediction, setPrediction] = useState(""); // 예측 결과 상태

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value }); // 입력 값 업데이트
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // 기본 폼 제출 동작 방지

//     try {
//       console.log("Sending request to backend:", formData); // 요청 데이터 확인
//       const response = await api.post(
//         "/predict", // Spring Boot로 요청 보내기
//         formData
//       );
//       console.log("Response from backend:", response.data); // 응답 확인
//       setPrediction(response.data.prediction); // 예측 결과 업데이트
//     } catch (error) {
//       console.error(
//         "Error:",
//         error.response ? error.response.data : error.message
//       ); // 에러 로그 확인
//       setPrediction("Error fetching prediction");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         bgcolor: "background.default", // LightTheme 의 배경색 적용
//         color: "text.primary", // LightTheme 의 텍스트 색상 적용
//       }}
//     >
//       <Typography variant="h4" component="h1" gutterBottom>
//         Diabetes Prediction
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//           width: "300px",
//         }}
//       >
//         <TextField
//           type="number"
//           name="Pregnancies"
//           label="Pregnancies"
//           value={formData.Pregnancies}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           type="number"
//           name="Glucose"
//           label="Glucose"
//           value={formData.Glucose}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           type="number"
//           name="BloodPressure"
//           label="Blood Pressure"
//           value={formData.BloodPressure}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           type="number"
//           name="SkinThickness"
//           label="Skin Thickness"
//           value={formData.SkinThickness}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           type="number"
//           name="Insulin"
//           label="Insulin"
//           value={formData.Insulin}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           type="number"
//           name="BMI"
//           label="BMI"
//           value={formData.BMI}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           type="number"
//           name="DiabetesPedigreeFunction"
//           label="Diabetes Pedigree Function"
//           value={formData.DiabetesPedigreeFunction}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           type="number"
//           name="Age"
//           label="Age"
//           value={formData.Age}
//           onChange={handleChange}
//           fullWidth
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Get Prediction
//         </Button>
//       </Box>
//       <Typography variant="h6" component="p" sx={{ mt: 2 }}>
//         Prediction: <strong>{prediction}</strong>
//       </Typography>
//     </Box>
//   );
// };

// export default Predict;
