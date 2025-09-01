import axios from 'axios'

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: {
    name: string
    email: string
    password: string
    phoneNumber?: string
    address?: string
  }) => api.post('/auth/register', userData),
  
  refreshToken: () => api.post('/auth/refresh'),
  
  logout: () => api.post('/auth/logout'),
}

export const menuApi = {
  getAll: () => api.get('/menu'),
  
  getByCategory: (category: string) => api.get(`/menu/category/${category}`),
  
  search: (query: string) => api.get(`/menu/search?query=${query}`),
  
  getById: (id: number) => api.get(`/menu/${id}`),
  
  // Admin endpoints
  create: (menuItem: any) => api.post('/menu', menuItem),
  
  update: (id: number, menuItem: any) => api.put(`/menu/${id}`, menuItem),
  
  delete: (id: number) => api.delete(`/menu/${id}`),
}

export const orderApi = {
  create: (orderData: any) => api.post('/orders', orderData),
  
  getMyOrders: () => api.get('/orders/my-orders'),
  
  getById: (id: number) => api.get(`/orders/${id}`),
  
  updateStatus: (id: number, status: string) =>
    api.put(`/orders/${id}/status`, { status }),
  
  // Admin endpoints
  getAll: () => api.get('/admin/orders'),
  
  getByStatus: (status: string) => api.get(`/admin/orders?status=${status}`),
}

export const paymentApi = {
  process: (paymentData: any) => api.post('/payment/process', paymentData),
  
  getStatus: (orderId: number) => api.get(`/payment/${orderId}`),
  
  createPaymentIntent: (amount: number) =>
    api.post('/payment/create-intent', { amount }),
}

export const userApi = {
  getProfile: () => api.get('/users/profile'),
  
  updateProfile: (userData: any) => api.put('/users/profile', userData),
  
  changePassword: (passwordData: {
    currentPassword: string
    newPassword: string
  }) => api.put('/users/change-password', passwordData),
  
  uploadAvatar: (formData: FormData) =>
    api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

export const deliveryApi = {
  getByOrderId: (orderId: number) => api.get(`/delivery/order/${orderId}`),
  
  updateLocation: (deliveryId: number, location: { lat: number; lng: number }) =>
    api.put(`/delivery/${deliveryId}/location`, location),
  
  updateStatus: (deliveryId: number, status: string) =>
    api.put(`/delivery/${deliveryId}/status`, { status }),
  
  // Driver endpoints
  getAssignedDeliveries: () => api.get('/driver/orders'),
  
  acceptDelivery: (orderId: number) => api.put(`/driver/orders/${orderId}/accept`),
  
  completeDelivery: (orderId: number) => api.put(`/driver/orders/${orderId}/complete`),
}

export const couponApi = {
  validate: (code: string) => api.post('/coupons/validate', { code }),
  
  apply: (code: string, orderAmount: number) =>
    api.post('/coupons/apply', { code, orderAmount }),
  
  // Admin endpoints
  getAll: () => api.get('/admin/coupons'),
  
  create: (couponData: any) => api.post('/admin/coupons', couponData),
  
  update: (id: number, couponData: any) =>
    api.put(`/admin/coupons/${id}`, couponData),
  
  delete: (id: number) => api.delete(`/admin/coupons/${id}`),
}

// Utility functions
export const uploadFile = async (file: File, endpoint: string) => {
  const formData = new FormData()
  formData.append('file', file)
  
  return api.post(endpoint, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const downloadFile = async (url: string, filename: string) => {
  const response = await api.get(url, { responseType: 'blob' })
  const blob = new Blob([response.data])
  const downloadUrl = window.URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(downloadUrl)
}

export default api
