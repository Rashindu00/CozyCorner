# 🍕 CozyCorner - Restaurant Ordering Platform

A comprehensive restaurant ordering platform similar to Pizza Hut or Burger King, built with **Spring Boot** backend and designed for modern food delivery services.

## 🚀 Features

### **Customer Features**
- 📱 Browse menu with categories (Pizza, Burgers, Appetizers, etc.)
- 🛒 Add items to cart with customizations
- 💳 Multiple payment methods (Credit Card, PayPal, Cash on Delivery)
- 📍 Real-time order tracking
- 🏆 Loyalty points system
- 📱 Order history and favorites
- 🔍 Search and filter menu items

### **Admin Features**
- 📊 Dashboard with sales analytics
- 🍔 Menu management (Add/Edit/Delete items)
- 📋 Order management and status updates
- 🎟️ Coupon and discount management
- 👥 Customer management
- 📈 Revenue tracking and reports

### **Driver Features**
- 🚗 Delivery assignment system
- 📱 Real-time order tracking
- 📍 GPS location updates
- ✅ Order status management

## 🛠️ Tech Stack

### **Backend**
- **Spring Boot 3.2.0** - Main framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database operations
- **JWT** - Token-based authentication
- **PostgreSQL** - Production database
- **H2** - Testing database
- **Stripe API** - Payment processing
- **WebSocket** - Real-time communication

### **Architecture**
- **RESTful API** design
- **Multi-role authentication** (Customer, Admin, Driver)
- **Real-time notifications** via WebSocket
- **File upload** support for menu images
- **Comprehensive validation** and error handling

## 📁 Project Structure

```
src/main/java/com/cozycorner/restaurant/
├── entity/           # JPA Entities
│   ├── User.java
│   ├── MenuItem.java
│   ├── Order.java
│   ├── OrderItem.java
│   ├── Payment.java
│   ├── Delivery.java
│   └── Coupon.java
├── repository/       # Data Access Layer
├── service/          # Business Logic Layer
├── controller/       # REST Controllers
├── security/         # JWT & Security Config
├── config/           # Spring Configuration
├── dto/              # Data Transfer Objects
└── exception/        # Custom Exceptions
```

## 🗃️ Database Schema

### **Core Entities**
- **Users** - Customer, Admin, Driver profiles
- **MenuItems** - Food items with categories, prices, descriptions
- **Orders** - Customer orders with status tracking
- **OrderItems** - Individual items within an order
- **Payments** - Payment information and status
- **Deliveries** - Delivery tracking and driver assignment
- **Coupons** - Discount codes and promotions

### **Key Relationships**
- One User can have many Orders (Customer)
- One Order can have many OrderItems
- One Order has one Payment
- One Order has one Delivery
- One Driver (User) can handle many Deliveries

## 🔐 API Security

### **Authentication**
- JWT-based stateless authentication
- Role-based access control (RBAC)
- Secure password hashing with BCrypt

### **Authorization Levels**
- **Public**: Menu browsing, user registration
- **Customer**: Place orders, view order history
- **Admin**: Manage menu, orders, analytics
- **Driver**: Access assigned deliveries

## 📡 API Endpoints

### **Authentication**
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/refresh      # Refresh JWT token
```

### **Menu Management**
```
GET  /api/menu              # Get all available items
GET  /api/menu/category/{category}  # Get items by category
GET  /api/menu/search?query={term}  # Search menu items
POST /api/menu              # Add new item (Admin)
PUT  /api/menu/{id}         # Update item (Admin)
```

### **Order Management**
```
POST /api/orders            # Place new order (Customer)
GET  /api/orders/my-orders  # Get customer orders
PUT  /api/orders/{id}/status # Update order status (Admin)
GET  /api/admin/orders      # Get all orders (Admin)
```

### **Payment Processing**
```
POST /api/payment/process   # Process payment
GET  /api/payment/{orderId} # Get payment status
```

### **Delivery Tracking**
```
GET  /api/driver/orders     # Get assigned deliveries (Driver)
PUT  /api/driver/location   # Update driver location
PUT  /api/delivery/{id}/status # Update delivery status
```

## 🚀 Quick Start

### **Prerequisites**
- Java 17+
- Maven 3.6+
- PostgreSQL 12+
- Node.js (for frontend development)

### **Setup Instructions**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/CozyCorner.git
cd CozyCorner
```

2. **Prerequisites Installation**
```bash
# Install Java 17+ (if not installed)
# Download from: https://adoptium.net/temurin/releases/

# Install Maven (if not installed)
# Download from: https://maven.apache.org/download.cgi
# Add Maven bin directory to your PATH environment variable

# Verify installations
java -version
mvn -version
```

3. **Configure Database**
- Create PostgreSQL database: `cozycorner_db`
- Update `application.properties` with your database credentials

4. **Build and Run Backend**
```bash
# Install dependencies
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

5. **Run Frontend** (in a separate terminal)
```bash
cd frontend
npm install
npm run dev
```

6. **Access the Application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api`
- H2 Console (testing): `http://localhost:8080/h2-console`

### **Quick Start (Frontend Only)**
If you want to run just the frontend with mock data:
```bash
cd frontend
npm install
npm run dev
```
The frontend includes fallback mock data when the backend is not running.

### **Default Test Users** (Backend Required)
```
Admin: admin@cozycorner.com / admin123
Customer: customer@test.com / customer123
Driver: driver@test.com / driver123
```

**Note:** Authentication requires the Spring Boot backend to be running. The frontend includes demo functionality with mock data when the backend is unavailable.

## 🧪 Testing

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=MenuControllerTest

# Run with test profile
mvn test -Dspring.profiles.active=test
```

## 🔧 Configuration

### **Environment Variables**
```
DB_URL=jdbc:postgresql://localhost:5432/cozycorner_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
STRIPE_API_KEY=your_stripe_secret_key
```

### **Application Properties**
Key configurations in `application.properties`:
- Database connection
- JWT settings
- File upload limits
- CORS configuration
- Payment gateway settings

## 🛣️ Development Roadmap

### **Phase 1: Core Features** ✅
- User authentication and authorization
- Menu management
- Basic order placement
- Payment integration

### **Phase 2: Advanced Features** 🚧
- Real-time order tracking
- Delivery management
- Admin dashboard
- Email notifications

### **Phase 3: Enhanced Features** 📅
- Mobile app development
- AI-powered recommendations
- Advanced analytics
- Multi-location support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- 📧 Email: support@cozycorner.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/CozyCorner/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/CozyCorner/wiki)

---

**Built with ❤️ using Spring Boot**