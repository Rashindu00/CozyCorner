'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { formatPrice } from '@/lib/utils'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Gift } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getSubtotal, getTotal, getTotalItems } = useCart()
  const { isAuthenticated } = useAuth()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const subtotal = getSubtotal()
  const deliveryFee = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const discount = appliedCoupon ? (appliedCoupon.discountType === 'PERCENTAGE' ? subtotal * (appliedCoupon.discountValue / 100) : appliedCoupon.discountValue) : 0
  const total = subtotal + deliveryFee + tax - discount

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId)
      return
    }
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeItem(itemId)
    toast.success(`Removed ${itemName} from cart`)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared')
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code')
      return
    }

    setIsApplyingCoupon(true)
    
    // Mock coupon validation - replace with actual API call
    setTimeout(() => {
      const mockCoupons = [
        { code: 'WELCOME10', discountType: 'PERCENTAGE', discountValue: 10, description: '10% off your order' },
        { code: 'SAVE5', discountType: 'FIXED_AMOUNT', discountValue: 5, description: '$5 off your order' },
        { code: 'FREESHIP', discountType: 'FREE_DELIVERY', discountValue: deliveryFee, description: 'Free delivery' }
      ]
      
      const coupon = mockCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase())
      
      if (coupon) {
        setAppliedCoupon(coupon)
        toast.success(`Coupon applied: ${coupon.description}`)
      } else {
        toast.error('Invalid coupon code')
      }
      
      setIsApplyingCoupon(false)
    }, 1000)
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    toast.success('Coupon removed')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-sm p-12">
              <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
              <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
                Your cart is empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet. Start browsing our delicious menu!
              </p>
              <Link
                href="/menu"
                className="inline-flex items-center btn-primary px-8 py-3 text-lg"
              >
                <ArrowLeft size={20} className="mr-2" />
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              Your Cart
            </h1>
            <p className="text-gray-600 mt-1">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/menu"
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              <ArrowLeft size={20} className="mr-1" />
              Continue Shopping
            </Link>
            
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 flex items-center"
            >
              <Trash2 size={20} className="mr-1" />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.menuItem.imageUrl || `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop`}
                        alt={item.menuItem.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop'
                        }}
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {item.menuItem.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-1">
                        {item.menuItem.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="font-semibold text-primary-600">
                          {formatPrice(item.unitPrice)}
                        </span>
                        {item.specialInstructions && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Special instructions added
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 rounded-l-lg"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 rounded-r-lg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.id, item.menuItem.name)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <span className="font-bold text-lg text-gray-900">
                        {formatPrice(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="font-semibold text-xl text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <div className="flex gap-2 mb-2">
                  <div className="flex-1 relative">
                    <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={!!appliedCoupon}
                    />
                  </div>
                  
                  {appliedCoupon ? (
                    <button
                      onClick={handleRemoveCoupon}
                      className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon}
                      className="btn-primary px-4 py-2 disabled:opacity-50"
                    >
                      {isApplyingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                  )}
                </div>
                
                {appliedCoupon && (
                  <div className="text-sm text-green-600 bg-green-50 p-2 rounded border border-green-200">
                    ✓ {appliedCoupon.description}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-xl text-primary-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Free Delivery Notice */}
              {deliveryFee > 0 && (
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg mb-6 border border-amber-200">
                  Add {formatPrice(50 - subtotal)} more for free delivery!
                </div>
              )}

              {/* Checkout Button */}
              {isAuthenticated ? (
                <Link
                  href="/checkout"
                  className="w-full btn-primary py-3 text-center block text-lg font-semibold"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login?redirect=/checkout"
                    className="w-full btn-primary py-3 text-center block text-lg font-semibold"
                  >
                    Login to Checkout
                  </Link>
                  <p className="text-xs text-gray-500 text-center">
                    New customer?{' '}
                    <Link href="/register" className="text-primary-600 hover:text-primary-700">
                      Create an account
                    </Link>
                  </p>
                </div>
              )}

              {/* Estimated Delivery Time */}
              <div className="mt-6 text-center text-sm text-gray-600">
                🚚 Estimated delivery: 30-45 minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
