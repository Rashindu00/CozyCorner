'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { menuApi } from '@/lib/api'
import { useCart } from '@/contexts/CartContext'
import { MenuItem } from '@/types'
import { formatPrice } from '@/lib/utils'
import { Plus, Star, Clock, Leaf, Flame } from 'lucide-react'
import toast from 'react-hot-toast'

export function FeaturedMenu() {
  const { addItem } = useCart()
  
  // Mock data for featured menu items
  const mockMenuItems: MenuItem[] = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh mozzarella, tomato sauce, and basil on crispy crust",
      price: 14.99,
      category: 'PIZZA',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
      isAvailable: true,
      preparationTime: 15,
      isVegetarian: true,
      isSpicy: false,
      calories: 280,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Classic Cheeseburger",
      description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce",
      price: 12.99,
      category: 'BURGER',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop',
      isAvailable: true,
      preparationTime: 12,
      isVegetarian: false,
      isSpicy: false,
      calories: 450,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce, parmesan cheese, croutons, and caesar dressing",
      price: 9.99,
      category: 'SALAD',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop',
      isAvailable: true,
      preparationTime: 5,
      isVegetarian: true,
      isSpicy: false,
      calories: 180,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 4,
      name: "Spicy Buffalo Wings",
      description: "Crispy chicken wings tossed in spicy buffalo sauce",
      price: 11.99,
      category: 'APPETIZER',
      imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=250&fit=crop',
      isAvailable: true,
      preparationTime: 18,
      isVegetarian: false,
      isSpicy: true,
      calories: 320,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 5,
      name: "Chocolate Brownie",
      description: "Rich chocolate brownie served warm with vanilla ice cream",
      price: 7.99,
      category: 'DESSERT',
      imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=250&fit=crop',
      isAvailable: true,
      preparationTime: 8,
      isVegetarian: true,
      isSpicy: false,
      calories: 420,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 6,
      name: "Fresh Lemonade",
      description: "Refreshing homemade lemonade with fresh lemons",
      price: 3.99,
      category: 'BEVERAGE',
      imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=250&fit=crop',
      isAvailable: true,
      preparationTime: 3,
      isVegetarian: true,
      isSpicy: false,
      calories: 120,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 7,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni pizza with mozzarella and tomato sauce",
      price: 16.99,
      category: 'PIZZA',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
      isAvailable: true,
      preparationTime: 15,
      isVegetarian: false,
      isSpicy: false,
      calories: 350,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 8,
      name: "Veggie Burger",
      description: "Plant-based patty with fresh vegetables and avocado",
      price: 13.99,
      category: 'BURGER',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop',
      isAvailable: true,
      preparationTime: 12,
      isVegetarian: true,
      isSpicy: false,
      calories: 380,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  const { data: menuItems, isLoading, error } = useQuery(
    'featured-menu',
    () => menuApi.getAll(),
    {
      select: (response) => response.data.slice(0, 8), // Get first 8 items
      retry: false, // Don't retry failed requests
      onError: () => {
        console.log('API failed, using mock data')
      }
    }
  )

  // Use mock data if API fails
  const displayItems = error ? mockMenuItems : (menuItems || [])

  const handleAddToCart = (item: MenuItem) => {
    addItem(item)
    toast.success(`${item.name} added to cart!`)
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900">
              Featured Menu
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error && !displayItems.length) {
    return (
      <section className="py-16 bg-white">
        <div className="container text-center">
          <p className="text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-4">
            Unable to connect to server. Showing demo menu items.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Menu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular dishes, crafted with fresh ingredients and 
            bursting with flavor
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayItems?.map((item: MenuItem) => (
            <div
              key={item.id}
              className="food-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Food Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.imageUrl || `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop`}
                  alt={item.name}
                  className="food-image w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop'
                  }}
                />
                
                {/* Quick Add Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-50 hover:text-primary-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Plus size={16} />
                </button>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {item.isVegetarian && (
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      <Leaf size={12} className="mr-1" />
                      Veg
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      <Flame size={12} className="mr-1" />
                      Spicy
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                  {item.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {item.preparationTime || 15} min
                  </div>
                  <div className="flex items-center">
                    <Star size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                    4.5
                  </div>
                  {item.calories && (
                    <div>{item.calories} cal</div>
                  )}
                </div>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-gray-900">
                    {formatPrice(item.price)}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/menu"
            className="inline-flex items-center px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            View Full Menu
            <Plus size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
