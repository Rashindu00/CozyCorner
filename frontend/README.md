# CozyCorner Frontend

Modern Next.js frontend for the CozyCorner restaurant ordering platform.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Real-time Updates**: WebSocket integration for order tracking
- **Payment Integration**: Stripe payment processing
- **Authentication**: JWT-based authentication with protected routes
- **State Management**: Zustand for global state management
- **Data Fetching**: React Query for server state management
- **Form Handling**: React Hook Form with validation
- **Mobile Responsive**: Fully responsive design
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Forms**: React Hook Form
- **Authentication**: Custom JWT implementation
- **Payment**: Stripe
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Real-time**: Socket.IO Client

## 📁 Project Structure

```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── menu/              # Menu pages
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── forms/            # Form components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── store/                # Zustand stores
├── types/                # TypeScript type definitions
└── utils/                # Helper utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on port 8080

### Installation

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
# Update the environment variables
```

3. **Run Development Server**
```bash
npm run dev
```

4. **Open in Browser**
```
http://localhost:3000
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SOCKET_URL=http://localhost:8080
```

## 📱 Pages & Features

### **Customer Pages**
- **Home** (`/`) - Landing page with featured items
- **Menu** (`/menu`) - Browse all menu items with filtering
- **Cart** (`/cart`) - Review items before checkout
- **Checkout** (`/checkout`) - Payment and order placement
- **Orders** (`/orders`) - Order history and tracking
- **Profile** (`/profile`) - User account management

### **Authentication**
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration
- **Password Reset** (`/forgot-password`) - Password recovery

### **Additional Pages**
- **About** (`/about`) - Restaurant information
- **Contact** (`/contact`) - Contact form and information

## 🎨 Design System

### **Colors**
- **Primary**: Orange (#f97316) - Warm, appetizing color
- **Secondary**: Red (#ef4444) - Accent and alerts
- **Gray Scale**: Various shades for text and backgrounds

### **Typography**
- **Headings**: Poppins (Display font)
- **Body**: Inter (Reading font)

### **Components**
- Consistent spacing using Tailwind's spacing scale
- Rounded corners (8px standard)
- Subtle shadows and hover effects
- Mobile-first responsive design

## 🔄 State Management

### **Global State (Zustand)**
- User authentication state
- Shopping cart state
- Order tracking state
- UI state (modals, notifications)

### **Server State (React Query)**
- Menu items data
- Order history
- User profile data
- Real-time order updates

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e
```

## 📦 Build & Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🔌 API Integration

The frontend communicates with the Spring Boot backend through:

- **REST API**: CRUD operations for menu, orders, users
- **WebSocket**: Real-time order status updates
- **Stripe API**: Payment processing
- **File Upload**: Image uploads for user profiles

### **API Endpoints Used**
```
GET    /api/menu                    # Get menu items
POST   /api/auth/login              # User authentication
POST   /api/orders                  # Place new order
GET    /api/orders/my-orders        # Get user orders
POST   /api/payment/process         # Process payment
```

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components and images
- **Caching**: React Query for API responses
- **Bundle Analysis**: Built-in bundle analyzer

## 🔒 Security

- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs
- **CSRF Protection**: Built-in Next.js protection
- **Secure Headers**: Security headers configuration
- **JWT Handling**: Secure token storage and refresh

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using Next.js & TypeScript**
