// Utility functions for the frontend

// Format price to currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// Format date
export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

// Calculate delivery time estimate
export const calculateDeliveryTime = (preparationTime: number = 15): string => {
  const now = new Date()
  const deliveryTime = new Date(now.getTime() + (preparationTime + 20) * 60000) // prep + delivery
  
  return deliveryTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

// Generate order number
export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `CC${timestamp}${random}`
}

// Calculate cart total
export const calculateCartTotal = (items: any[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

// Apply discount to amount
export const applyDiscount = (
  amount: number,
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT',
  discountValue: number,
  maxDiscount?: number
): number => {
  let discount = 0
  
  if (discountType === 'PERCENTAGE') {
    discount = amount * (discountValue / 100)
  } else {
    discount = discountValue
  }
  
  if (maxDiscount && discount > maxDiscount) {
    discount = maxDiscount
  }
  
  return Math.max(0, amount - discount)
}

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Generate random color for avatars
export const generateAvatarColor = (name: string): string => {
  const colors = [
    '#f97316', '#ef4444', '#10b981', '#3b82f6', 
    '#8b5cf6', '#f59e0b', '#06b6d4', '#84cc16'
  ]
  
  const index = name.length % colors.length
  return colors[index]
}

// Check if item is in favorites
export const isInFavorites = (itemId: number, favorites: number[]): boolean => {
  return favorites.includes(itemId)
}

// Storage utilities
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.error('Failed to save to localStorage')
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },
  
  clear: () => {
    if (typeof window === 'undefined') return
    localStorage.clear()
  }
}

// Class name utility (similar to clsx)
export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ')
}

// Order status helpers
export const getOrderStatusColor = (status: string): string => {
  const statusColors = {
    PENDING: 'text-yellow-600 bg-yellow-100',
    CONFIRMED: 'text-blue-600 bg-blue-100',
    PREPARING: 'text-orange-600 bg-orange-100',
    READY: 'text-purple-600 bg-purple-100',
    OUT_FOR_DELIVERY: 'text-indigo-600 bg-indigo-100',
    DELIVERED: 'text-green-600 bg-green-100',
    CANCELLED: 'text-red-600 bg-red-100',
  }
  
  return statusColors[status as keyof typeof statusColors] || 'text-gray-600 bg-gray-100'
}

export const getOrderStatusText = (status: string): string => {
  const statusTexts = {
    PENDING: 'Order Received',
    CONFIRMED: 'Order Confirmed',
    PREPARING: 'Being Prepared',
    READY: 'Ready for Pickup',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
  }
  
  return statusTexts[status as keyof typeof statusTexts] || status
}
