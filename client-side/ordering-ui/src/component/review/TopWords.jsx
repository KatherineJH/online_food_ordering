// 테스트 페이지
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper } from "@mui/material";

const TopWords = () => {
  const [topWords, setTopWords] = useState([]);
  const [worstWords, setWorstWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        // ❌ 로컬 개발 방식 (프론트에서 Flask를 직접 접근)
        const topResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}:5000/top-words`,
        );
        const worstResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}:5000/worst-words`,
        );
        // // ✅ 수정된 방식 (NGINX 통해 접근)
        // const topResponse = await axios.get("http://localhost:8080/flask/top-words");
        // const worstResponse = await axios.get("http://localhost:8080/flask/worst-words");
        setTopWords(topResponse.data.top_influential_words);
        setWorstWords(worstResponse.data.bottom_influential_words);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };
    fetchWords();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Top Influential Words
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top 20 Positive Words
            </Typography>
            <ul>
              {topWords.map((word, idx) => (
                <li key={idx}>{word}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top 20 Negative Words
            </Typography>
            <ul>
              {worstWords.map((word, idx) => (
                <li key={idx}>{word}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopWords;
