// User Types
export interface User {
  id: number
  name: string
  email: string
  phoneNumber?: string
  address?: string
  role: 'CUSTOMER' | 'ADMIN' | 'DRIVER'
  isActive: boolean
  createdAt: string
  updatedAt: string
  loyaltyPoints: number
}

// Menu Item Types
export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: MenuCategory
  imageUrl?: string
  isAvailable: boolean
  preparationTime?: number
  isVegetarian: boolean
  isSpicy: boolean
  calories?: number
  createdAt: string
  updatedAt: string
}

export type MenuCategory = 
  | 'PIZZA' 
  | 'BURGER' 
  | 'PASTA' 
  | 'SALAD' 
  | 'APPETIZER' 
  | 'DESSERT' 
  | 'BEVERAGE' 
  | 'SIDES'

// Order Types
export interface Order {
  id: number
  customer: User
  status: OrderStatus
  totalPrice: number
  deliveryAddress?: string
  specialInstructions?: string
  orderType: 'DELIVERY' | 'PICKUP'
  estimatedDeliveryTime?: string
  actualDeliveryTime?: string
  createdAt: string
  updatedAt: string
  orderItems: OrderItem[]
  payment?: Payment
  delivery?: Delivery
}

export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PREPARING' 
  | 'READY' 
  | 'OUT_FOR_DELIVERY' 
  | 'DELIVERED' 
  | 'CANCELLED'

// Order Item Types
export interface OrderItem {
  id: number
  order: Order
  menuItem: MenuItem
  quantity: number
  unitPrice: number
  totalPrice: number
  customization?: string
}

// Payment Types
export interface Payment {
  id: number
  order: Order
  amount: number
  paymentMethod: PaymentMethod
  status: PaymentStatus
  transactionId?: string
  paymentGateway?: string
  createdAt: string
  completedAt?: string
  failureReason?: string
}

export type PaymentMethod = 
  | 'CREDIT_CARD' 
  | 'DEBIT_CARD' 
  | 'PAYPAL' 
  | 'GOOGLE_PAY' 
  | 'APPLE_PAY' 
  | 'CASH_ON_DELIVERY'

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'

// Delivery Types
export interface Delivery {
  id: number
  order: Order
  driver?: User
  status: DeliveryStatus
  pickupTime?: string
  deliveryTime?: string
  estimatedDeliveryTime?: string
  currentLatitude?: number
  currentLongitude?: number
  deliveryNotes?: string
  createdAt: string
  updatedAt: string
}

export type DeliveryStatus = 
  | 'PENDING' 
  | 'ASSIGNED' 
  | 'PICKED_UP' 
  | 'ON_THE_WAY' 
  | 'DELIVERED' 
  | 'FAILED'

// Coupon Types
export interface Coupon {
  id: number
  code: string
  description?: string
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT'
  discountValue: number
  minimumOrderAmount?: number
  maximumDiscountAmount?: number
  usageLimit?: number
  usageCount: number
  validFrom: string
  validUntil: string
  isActive: boolean
  createdAt: string
}

// Cart Types
export interface CartItem {
  id: string
  menuItem: MenuItem
  quantity: number
  customization?: string
  specialInstructions?: string
  unitPrice: number
  totalPrice: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  appliedCoupon?: Coupon
  discountAmount: number
  finalPrice: number
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  message?: string
  error?: string
  status: number
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  page: number
  size: number
  first: boolean
  last: boolean
}

// Authentication Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  phoneNumber?: string
  address?: string
}

export interface AuthResponse {
  token: string
  user: User
  expiresIn: number
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface AddressForm {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

// UI Types
export interface LoadingState {
  isLoading: boolean
  error?: string
}

export interface NotificationState {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

// React Component Types
export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
}

export interface PageProps {
  params?: Record<string, string>
  searchParams?: Record<string, string | string[]>
}

export interface LayoutProps {
  children: React.ReactNode
}
