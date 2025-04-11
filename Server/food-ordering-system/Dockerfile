FROM openjdk:17-jdk-slim
WORKDIR /app
COPY . /app
RUN ./gradlew build -x test  # 테스트 제외
EXPOSE 5454
CMD ["java", "-jar", "build/libs/food-ordering-system-0.0.1-SNAPSHOT.war"]