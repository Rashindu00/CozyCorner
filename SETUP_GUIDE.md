# CozyCorner Restaurant Platform Setup Guide

## Quick Start (Frontend Only)

The frontend is now configured to work independently with mock data when the backend is not available.

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit: `http://localhost:3000`

The application will show mock data for menu items when the backend API is not running.

## Full Setup (Frontend + Backend)

To get the complete functionality with real API endpoints:

### Backend Setup

#### Prerequisites
- Java 17 or higher
- Maven 3.6+ 
- PostgreSQL (optional - H2 database is configured for development)

#### Installation Steps

1. **Install Maven** (if not already installed):
   - **Windows**: Download from https://maven.apache.org/download.cgi
   - **macOS**: `brew install maven`
   - **Linux**: `sudo apt install maven` or `sudo yum install maven`

2. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

3. **Install dependencies and build**:
   ```bash
   mvn clean install
   ```

4. **Run the Spring Boot application**:
   ```bash
   mvn spring-boot:run
   ```

   Or alternatively:
   ```bash
   java -jar target/restaurant-management-0.0.1-SNAPSHOT.jar
   ```

5. **Backend will be available at**: `http://localhost:8080`

### Database Configuration

The application is configured to use H2 in-memory database by default for development. 

#### H2 Database (Default)
- No additional setup required
- Data is reset on application restart
- H2 Console available at: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: (leave empty)

#### PostgreSQL (Production)
To use PostgreSQL, update `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/restaurant_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### API Endpoints

Once the backend is running, the following endpoints will be available:

- **Menu Items**: `GET /api/menu`
- **User Authentication**: `POST /api/auth/login`
- **User Registration**: `POST /api/auth/register`
- **Orders**: `GET/POST /api/orders`
- **Cart Management**: via frontend state management

### Features

#### Current Implementation
✅ **Frontend Features**:
- Responsive design with Tailwind CSS
- User authentication (login/register)
- Shopping cart functionality
- Menu browsing with filtering and sorting
- Real-time WebSocket integration
- Toast notifications
- Professional UI components

✅ **Backend Features**:
- RESTful API with Spring Boot
- JWT-based authentication
- Role-based access control (Customer, Admin, Driver)
- Complete database schema
- Security configuration
- WebSocket support for real-time features

#### Mock Data Fallback
When the backend is not running, the frontend automatically uses mock data including:
- 10 sample menu items with various categories
- Complete menu browsing functionality
- Cart management
- All UI interactions

### Development Workflow

1. **Frontend Development**: Work on UI/UX with mock data
2. **Backend Development**: Build and test API endpoints
3. **Integration**: Connect frontend to real backend APIs
4. **Testing**: Verify all features work together

### Troubleshooting

**Frontend Issues**:
- Ensure Node.js version is 18+
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**Backend Issues**:
- Verify Java version: `java -version`
- Check Maven installation: `mvn -version`
- Ensure ports 8080 is available
- Check application logs for detailed error messages

**API Connection Issues**:
- Verify backend is running on `http://localhost:8080`
- Check browser console for CORS or network errors
- The app will automatically fall back to mock data if backend is unavailable

### Next Steps

1. **Add More Features**:
   - Payment integration
   - Order tracking
   - Admin dashboard
   - Delivery management

2. **Deployment**:
   - Frontend: Deploy to Vercel, Netlify, or similar
   - Backend: Deploy to Heroku, AWS, or similar
   - Database: Use PostgreSQL in production

3. **Enhancement**:
   - Add more menu items
   - Implement advanced search
   - Add user profiles
   - Integrate real payment gateway

For any issues or questions, check the console logs and refer to the component documentation in the codebase.
