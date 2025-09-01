#!/bin/bash

# CozyCorner Development Setup Script

echo "🍕 Setting up CozyCorner Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    print_error "Java is not installed. Please install Java 17+ from https://openjdk.org/"
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    print_error "Maven is not installed. Please install Maven from https://maven.apache.org/"
    exit 1
fi

print_status "Prerequisites check passed!"

# Setup Backend
echo ""
echo "🚀 Setting up Backend (Spring Boot)..."

# Install backend dependencies
print_status "Installing backend dependencies..."
mvn clean install -DskipTests

# Setup Frontend
echo ""
echo "🎨 Setting up Frontend (Next.js)..."

cd frontend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found in frontend directory"
    exit 1
fi

# Install frontend dependencies
print_status "Installing frontend dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    print_warning "Creating .env.local file..."
    cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
NEXT_PUBLIC_SOCKET_URL=http://localhost:8080
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
EOF
    print_warning "Please update the environment variables in frontend/.env.local"
fi

cd ..

# Database setup instructions
echo ""
echo "🗄️  Database Setup Required:"
echo "1. Install PostgreSQL 12+"
echo "2. Create database: createdb cozycorner_db"
echo "3. Update application.properties with your database credentials"

# Final instructions
echo ""
echo "🎉 Setup Complete!"
echo ""
echo "To start the development servers:"
echo ""
echo "Backend (Terminal 1):"
echo "  mvn spring-boot:run"
echo ""
echo "Frontend (Terminal 2):"
echo "  cd frontend && npm run dev"
echo ""
echo "Access the application:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:8080/api"
echo "  H2 Console (testing): http://localhost:8080/h2-console"
echo ""
echo "Default test credentials:"
echo "  Admin: admin@cozycorner.com / admin123"
echo "  Customer: customer@test.com / customer123"
echo ""
print_status "Happy coding! 🚀"
