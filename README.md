# 온라인 배달 웹앱 서비스
## https://kat-delivery.netlify.app/
![image](https://github.com/user-attachments/assets/49cd42e0-5100-4bdc-880a-a57643a397a4)

---

### 🛠️ Server Side
- Spring Boot
- Spring Security + JWT
- MySQL

### 💻 Client Side
- React, Redux
- Tailwind CSS, MUI, etc

### 🧠 리뷰 분석 시스템
- Flask, scikit-learn, Torch
- 리뷰 분석을 통한 긍정/부정 리뷰 분류 → 점수를 통해 1~5점 자동 Rating System 
- 트레이닝 데이터는 Yelp Dataset 사용 → 영어만 분석 가능하다는 한계를 가짐
- MLP 사용으로 모델 성능은 높으나 예측하지 못한 입력값에 대한 처리 정확도가 떨어지는 한계를 가짐 → 향후 과제로서 BERT 모델 적용 예정

### 🔍 자동 검색 기능
- Elastic Search
- DB 기반 검색어 자동 완성
- Typo 검색도 가능 (예: `piza`, `burgir` → 관련 식당 추천)

![image](https://github.com/user-attachments/assets/18cff43c-33a5-4fa6-934b-704c14b12319)

---

## 🚀 로컬 실행 순서 (도커 설치 필요)
> 배포 전 단계이므로, 각 서비스를 도커 컨테이너에 올리지 않고 **직접 실행**하는 구조입니다.  
> 컨테이너 배포용 코드는 주석 처리된 상태입니다.

---

### 1. FlaskAPI  
📁 `E-OrderingFood/online_food_ordering/FlaskAPI`

```bash
> python -m venv venv
> venv\Scripts\activate
> pip install -r requirements.txt
> python main.py
```

---

### 2. Elastic Search  
📁 `E-OrderingFood/`

```bash
> docker-compose up --build
```

---

### 3. React  
📁 `E-OrderingFood/online_food_ordering/client-side/ordering-ui`

```bash
> npm install
> npm run dev
```

---

### 4. MySQL  
- 자유롭게 DB 이름과 사용자/비밀번호를 설정해주세요.

---

### 5. Spring Boot  
📁 `E-OrderingFood/online_food_ordering/Server/food-ordering-system`

```bash
> gradlew bootRun
```

---

## 🎛️ 어드민 대시보드 별도 구성
![image](https://github.com/user-attachments/assets/c6033c50-f25c-426e-b851-ef172eda46d6)
