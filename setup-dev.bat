@echo off
:: CozyCorner Development Setup Script for Windows

echo 🍕 Setting up CozyCorner Development Environment...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java is not installed. Please install Java 17+ from https://openjdk.org/
    pause
    exit /b 1
)

:: Check if Maven is installed
mvn --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Maven is not installed. Please install Maven from https://maven.apache.org/
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

:: Setup Backend
echo.
echo 🚀 Setting up Backend (Spring Boot)...
echo Installing backend dependencies...
call mvn clean install -DskipTests

:: Setup Frontend
echo.
echo 🎨 Setting up Frontend (Next.js)...
cd frontend

:: Install frontend dependencies
echo Installing frontend dependencies...
call npm install

:: Create environment file if it doesn't exist
if not exist ".env.local" (
    echo ⚠️ Creating .env.local file...
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:8080/api
        echo NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
        echo NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
        echo NEXT_PUBLIC_SOCKET_URL=http://localhost:8080
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXTAUTH_SECRET=your_nextauth_secret_here
    ) > .env.local
    echo ⚠️ Please update the environment variables in frontend\.env.local
)

cd ..

:: Final instructions
echo.
echo 🎉 Setup Complete!
echo.
echo To start the development servers:
echo.
echo Backend (Terminal 1):
echo   mvn spring-boot:run
echo.
echo Frontend (Terminal 2):
echo   cd frontend ^&^& npm run dev
echo.
echo Access the application:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:8080/api
echo   H2 Console (testing): http://localhost:8080/h2-console
echo.
echo Default test credentials:
echo   Admin: admin@cozycorner.com / admin123
echo   Customer: customer@test.com / customer123
echo.
echo Database Setup Required:
echo 1. Install PostgreSQL 12+
echo 2. Create database: createdb cozycorner_db  
echo 3. Update application.properties with your database credentials
echo.
echo ✅ Happy coding! 🚀

pause
