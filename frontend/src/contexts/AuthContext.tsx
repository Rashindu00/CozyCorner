'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api'
import { User } from '@/types'
import { storage } from '@/lib/utils'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

interface RegisterData {
  name: string
  email: string
  password: string
  phoneNumber?: string
  address?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check for existing session on mount
  useEffect(() => {
    const token = storage.get('token')
    const savedUser = storage.get('user')

    if (token && savedUser) {
      setUser(savedUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authApi.login({ email, password })
      const { token, user: userData } = response.data

      // Store token and user data
      storage.set('token', token)
      storage.set('user', userData)
      setUser(userData)

      toast.success(`Welcome back, ${userData.name}!`)
      
      // Redirect based on user role
      if (userData.role === 'ADMIN') {
        router.push('/admin/dashboard')
      } else if (userData.role === 'DRIVER') {
        router.push('/driver/dashboard')
      } else {
        router.push('/')
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please try again.'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true)
      const response = await authApi.register(userData)
      const { token, user: newUser } = response.data

      // Store token and user data
      storage.set('token', token)
      storage.set('user', newUser)
      setUser(newUser)

      toast.success(`Welcome to CozyCorner, ${newUser.name}!`)
      router.push('/')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear storage
    storage.remove('token')
    storage.remove('user')
    storage.remove('cart')
    
    setUser(null)
    toast.success('Logged out successfully')
    router.push('/')
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      storage.set('user', updatedUser)
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protected routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: string[]
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !user) {
        router.push('/login')
        return
      }

      if (user && allowedRoles && !allowedRoles.includes(user.role)) {
        toast.error('You do not have permission to access this page')
        router.push('/')
        return
      }
    }, [user, isLoading, router])

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      )
    }

    if (!user) {
      return null
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return null
    }

    return <Component {...props} />
  }
}
