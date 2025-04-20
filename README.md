# 온라인 배달 웹앱 서비스
![image](https://github.com/user-attachments/assets/49cd42e0-5100-4bdc-880a-a57643a397a4)

### Server Side
- Spring Boot
- Spring Security + JWT
- MySQL

### Client Side
- React, Redux
- Tailwind CSS, MUI, etc

### 리뷰 분석 시스템
- Flask, scikit-learn, Torch
- 리뷰 분석을 통한 긍정/부정 리뷰 분류 -> 점수를 통해 1~5점 자동 Rating System 
- 트레이닝 데이터는 Yelp Dataset 사용 -> 영어만 분석 가능하다는 한계를 가짐
- MLP 사용으로 모델 성능은 높으나 예측하지 못한 입력값에 대한 처리 정확도가 떨어지는 한계를 가짐 -> 향후 과제로서 BERT 모델 적용 예정

### 자동 검색 기능
- Elastic Search
- DB 기반 검색어 자동 완성
- Typo 검색도 가능(예: piza, burgir...) -> 관련 식당 추천
  ![image](https://github.com/user-attachments/assets/18cff43c-33a5-4fa6-934b-704c14b12319) 

# 아직 배포 전 단계이므로 아래의 순서를 따라해주세요(도커 설치 되어 있어야 합니다.)
- 아래의 순서는 각 서비스를 도커 컨테이너에 올리지 않는 버전 코드를 로컬에서 실행하는 단계입니다.
- 컨테이너에 올리기 위한 일부 코드들이 현재는 주석 처리 되어있으며, 배포 전 단계이기 때문에 불필요하다 판단되어 아래의 순서로 안내 드립니다.
1. FlaskAPI(E-OrderingFood\online_food_ordering\FlaskAPI)
   > `> python -m venv venv (최초 시도 시) <br>
   > `> venv\Scripts\activate <br>
   > `> pip install -r requirements.txt <br>
   > `> python main.py  <br>
2. Elastic Search(E-OrderingFood 디렉토리에서)
   > `> docker-compose up --build <br>
3. React(E-OrderingFood\online_food_ordering\client-side\ordering-ui)
   > `> npm install <br>
   > `> npm run dev <br>
4. MySql: 자유롭게 DB 이름 설정 및 아이디와 암호를 넣어주세요.
5. Spring Boot(E-OrderingFood\online_food_ordering\Server\food-ordering-system)
   > `> gradlew bootRun <br>


# 어드민 대시보드 따로 디자인
![image](https://github.com/user-attachments/assets/c6033c50-f25c-426e-b851-ef172eda46d6)

