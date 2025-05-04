import axios from "axios";

// // ❌ 로컬 개발 방식 (프론트에서 Flask를 직접 접근)
// export const API_URL = "http://localhost:5454"; // ✅ Spring Boot 서버(local에서 개발하는 경우)
// // ✅ 수정된 방식 (NGINX 통해 접근)
// export const API_URL = "http://localhost:8080/"; // ✅ nginx로 통합하여 처리하는 경우

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}:5454`,
  headers: {
    "Content-Type": "application/json",
  },
});
