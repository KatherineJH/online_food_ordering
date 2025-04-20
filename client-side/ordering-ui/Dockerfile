FROM node:18

# 앱 디렉토리 생성
WORKDIR /app

# 의존성 파일을 컨테이너로 복사
COPY package*.json ./

# 의존성 설치
RUN rm -rf node_modules package-lock.json && npm install

# 앱 파일을 컨테이너로 복사
COPY . .

# 앱 실행
CMD ["npm", "run", "dev"]