import axios from "axios";

// export const API_URL = "http://localhost:5454" // ✅ Spring Boot 서버(local에서 개발하는 경우)
export const API_URL = "http://localhost:8080/"; // ✅ nginx로 통합하여 처리하는 경우

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
