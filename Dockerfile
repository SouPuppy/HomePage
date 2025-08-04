# Stage 1: Build Frontend
FROM node:22-alpine AS frontend-build
WORKDIR /app

COPY apps/frontend/package.json apps/frontend/pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install
COPY apps/frontend/ ./
RUN pnpm build

# Stage 2: Build Backend
FROM gradle:8.14.3-jdk21-alpine AS backend-build
WORKDIR /app
COPY apps/backend/ ./
RUN ./gradlew clean build -x test

# Stage 3: Run Stage - lightweight JRE image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy backend built jar
COPY --from=backend-build /app/build/libs/*.jar app.jar

# Copy frontend build output to backend static resources folder
COPY --from=frontend-build /app/dist ./static

# Expose port 8080
EXPOSE 8080

# Start command
ENTRYPOINT ["java", "-jar", "app.jar"]
