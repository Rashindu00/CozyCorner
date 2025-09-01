'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { MenuItem, CartItem, Coupon } from '@/types'
import { storage, calculateCartTotal } from '@/lib/utils'
import { couponApi } from '@/lib/api'
import toast from 'react-hot-toast'

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  appliedCoupon: Coupon | null
  discountAmount: number
  finalPrice: number
  isLoading: boolean
  addItem: (menuItem: MenuItem, quantity?: number, customization?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => Promise<void>
  removeCoupon: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Helper function for discount calculation
  const calculateDiscountAmount = (amount: number, coupon: Coupon): number => {
    if (coupon.discountType === 'PERCENTAGE') {
      return Math.min(amount * (coupon.discountValue / 100), coupon.maximumDiscountAmount || amount)
    }
    return Math.min(coupon.discountValue, amount)
  }

  // Load cart from storage on mount
  useEffect(() => {
    const savedCart = storage.get('cart')
    const savedCoupon = storage.get('appliedCoupon')
    
    if (savedCart) {
      setItems(savedCart)
    }
    if (savedCoupon) {
      setAppliedCoupon(savedCoupon)
    }
  }, [])

  // Save cart to storage whenever items change
  useEffect(() => {
    storage.set('cart', items)
  }, [items])

  // Save coupon to storage whenever it changes
  useEffect(() => {
    if (appliedCoupon) {
      storage.set('appliedCoupon', appliedCoupon)
    } else {
      storage.remove('appliedCoupon')
    }
  }, [appliedCoupon])

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = calculateCartTotal(items)
  
  // Calculate discount
  const discountAmount = appliedCoupon ? calculateDiscountAmount(totalPrice, appliedCoupon) : 0
  const finalPrice = totalPrice - discountAmount

  const addItem = (menuItem: MenuItem, quantity = 1, customization = '') => {
    setItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.menuItem.id === menuItem.id && item.customization === customization
      )

      if (existingItemIndex > -1) {
        // Update existing item
        const newItems = [...prev]
        newItems[existingItemIndex].quantity += quantity
        newItems[existingItemIndex].totalPrice = 
          newItems[existingItemIndex].menuItem.price * newItems[existingItemIndex].quantity
        return newItems
      } else {
        // Add new item with unique ID
        const newItem: CartItem = {
          id: `${menuItem.id}-${Date.now()}`, // Generate unique ID
          menuItem,
          quantity,
          customization,
          unitPrice: menuItem.price,
          totalPrice: menuItem.price * quantity,
          specialInstructions: customization
        }
        return [...prev, newItem]
      }
    })

    toast.success(`${menuItem.name} added to cart`)
  }

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId))
    toast.success('Item removed from cart')
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setItems(prev => 
      prev.map(item => 
        item.id === itemId
          ? {
              ...item,
              quantity,
              totalPrice: item.menuItem.price * quantity
            }
          : item
      )
    )
  }

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0)
  }

  const getTotal = () => {
    const subtotal = getSubtotal()
    const deliveryFee = subtotal > 50 ? 0 : 5.99
    const tax = subtotal * 0.08
    const discount = appliedCoupon ? calculateDiscountAmount(subtotal, appliedCoupon) : 0
    return subtotal + deliveryFee + tax - discount
  }

  const clearCart = () => {
    setItems([])
    setAppliedCoupon(null)
    storage.remove('cart')
    storage.remove('appliedCoupon')
    toast.success('Cart cleared')
  }

  const applyCoupon = async (code: string) => {
    try {
      setIsLoading(true)
      const response = await couponApi.apply(code, totalPrice)
      const coupon = response.data

      setAppliedCoupon(coupon)
      toast.success(`Coupon "${code}" applied successfully!`)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Invalid or expired coupon'
      toast.error(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    toast.success('Coupon removed')
  }

  const calculateDiscount = (amount: number, coupon: Coupon): number => {
    if (!coupon) return 0

    let discount = 0
    if (coupon.discountType === 'PERCENTAGE') {
      discount = amount * (coupon.discountValue / 100)
    } else {
      discount = coupon.discountValue
    }

    if (coupon.maximumDiscountAmount && discount > coupon.maximumDiscountAmount) {
      discount = coupon.maximumDiscountAmount
    }

    return Math.min(discount, amount)
  }

  const value = {
    items,
    totalItems,
    totalPrice,
    appliedCoupon,
    discountAmount,
    finalPrice,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    getTotalItems,
    getSubtotal,
    getTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
