'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from './AuthContext'
import { Order } from '@/types'
import toast from 'react-hot-toast'

interface WebSocketContextType {
  socket: Socket | null
  isConnected: boolean
  orderUpdates: Order[]
  deliveryLocation: { lat: number; lng: number } | null
  emitOrderStatusUpdate: (orderId: number, status: string) => void
  emitDeliveryLocationUpdate: (orderId: number, location: { lat: number; lng: number }) => void
  joinOrderRoom: (orderId: number) => void
  leaveOrderRoom: (orderId: number) => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [orderUpdates, setOrderUpdates] = useState<Order[]>([])
  const [deliveryLocation, setDeliveryLocation] = useState<{ lat: number; lng: number } | null>(null)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Create socket connection
      const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8080'
      const newSocket = io(socketUrl, {
        auth: {
          token: localStorage.getItem('token'),
          userId: user.id,
          userRole: user.role,
        },
        transports: ['websocket', 'polling'],
      })

      setSocket(newSocket)

      // Connection event handlers
      newSocket.on('connect', () => {
        setIsConnected(true)
        console.log('Connected to WebSocket server')
      })

      newSocket.on('disconnect', () => {
        setIsConnected(false)
        console.log('Disconnected from WebSocket server')
      })

      newSocket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error)
        setIsConnected(false)
      })

      // Order tracking events
      newSocket.on('orderStatusUpdate', (data: { order: Order; message: string }) => {
        setOrderUpdates(prev => {
          const existingIndex = prev.findIndex(o => o.id === data.order.id)
          if (existingIndex > -1) {
            const newUpdates = [...prev]
            newUpdates[existingIndex] = data.order
            return newUpdates
          }
          return [...prev, data.order]
        })

        // Show notification for order updates
        if (user.role === 'CUSTOMER' && data.order.customer.id === user.id) {
          toast.success(data.message)
        }
      })

      // Delivery tracking events
      newSocket.on('deliveryLocationUpdate', (data: { orderId: number; location: { lat: number; lng: number } }) => {
        setDeliveryLocation(data.location)
      })

      // Driver assignment notification
      newSocket.on('driverAssigned', (data: { order: Order; driver: any }) => {
        if (user.role === 'CUSTOMER' && data.order.customer.id === user.id) {
          toast.success(`Driver ${data.driver.name} has been assigned to your order!`)
        }
      })

      // Delivery completion
      newSocket.on('orderDelivered', (data: { order: Order }) => {
        if (user.role === 'CUSTOMER' && data.order.customer.id === user.id) {
          toast.success('Your order has been delivered! Enjoy your meal! 🍕')
        }
      })

      // Admin notifications
      if (user.role === 'ADMIN') {
        newSocket.on('newOrder', (data: { order: Order }) => {
          toast.success(`New order #${data.order.id} received!`)
        })

        newSocket.on('paymentCompleted', (data: { order: Order; payment: any }) => {
          toast.success(`Payment completed for order #${data.order.id}`)
        })
      }

      // Driver notifications
      if (user.role === 'DRIVER') {
        newSocket.on('newDeliveryAssignment', (data: { order: Order }) => {
          toast.success(`New delivery assigned: Order #${data.order.id}`)
        })
      }

      // Kitchen notifications
      newSocket.on('kitchenUpdate', (data: { message: string; orderId: number }) => {
        if (user.role === 'ADMIN') {
          toast(data.message, {
            icon: '👨‍🍳',
            style: {
              background: '#3b82f6',
              color: '#fff',
            },
          })
        }
      })

      return () => {
        newSocket.disconnect()
      }
    }
  }, [isAuthenticated, user])

  // Helper functions to emit events
  const emitOrderStatusUpdate = (orderId: number, status: string) => {
    if (socket && user?.role === 'ADMIN') {
      socket.emit('updateOrderStatus', { orderId, status })
    }
  }

  const emitDeliveryLocationUpdate = (orderId: number, location: { lat: number; lng: number }) => {
    if (socket && user?.role === 'DRIVER') {
      socket.emit('updateDeliveryLocation', { orderId, location })
    }
  }

  const joinOrderRoom = (orderId: number) => {
    if (socket) {
      socket.emit('joinOrderRoom', orderId)
    }
  }

  const leaveOrderRoom = (orderId: number) => {
    if (socket) {
      socket.emit('leaveOrderRoom', orderId)
    }
  }

  const value = {
    socket,
    isConnected,
    orderUpdates,
    deliveryLocation,
    emitOrderStatusUpdate,
    emitDeliveryLocationUpdate,
    joinOrderRoom,
    leaveOrderRoom,
  }

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>
}

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return context
}

// Custom hook for order tracking
export function useOrderTracking(orderId: number) {
  const { orderUpdates, joinOrderRoom, leaveOrderRoom } = useWebSocket()

  useEffect(() => {
    if (orderId) {
      joinOrderRoom(orderId)
      return () => leaveOrderRoom(orderId)
    }
  }, [orderId, joinOrderRoom, leaveOrderRoom])

  const orderUpdate = orderUpdates.find(order => order.id === orderId)
  return orderUpdate
}
