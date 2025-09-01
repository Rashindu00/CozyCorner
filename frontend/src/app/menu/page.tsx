'use client'

import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { menuApi } from '@/lib/api'
import { useCart } from '@/contexts/CartContext'
import { MenuItem } from '@/types'
import { formatPrice } from '@/lib/utils'
import { Search, Filter, Plus, Star, Clock, Leaf, Flame, X } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MenuPage() {
  const { addItem } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [sortBy, setSortBy] = useState('name')
  const [filters, setFilters] = useState({
    vegetarian: false,
    spicy: false,
    lowCalorie: false
  })
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for menu items (same as FeaturedMenu)
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
    },
    {
      id: 9,
      name: "Greek Salad",
      description: "Fresh vegetables, feta cheese, olives with olive oil dressing",
      price: 10.99,
      category: 'SALAD',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop',
      isAvailable: true,
      preparationTime: 7,
      isVegetarian: true,
      isSpicy: false,
      calories: 220,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 10,
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs",
      price: 5.99,
      category: 'SIDES',
      imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&h=250&fit=crop',
      isAvailable: true,
      preparationTime: 10,
      isVegetarian: true,
      isSpicy: false,
      calories: 180,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  const { data: menuItems, isLoading, error } = useQuery(
    ['menu', searchTerm, selectedCategory, sortBy, filters],
    () => menuApi.getAll(),
    {
      retry: false,
      onError: () => {
        console.log('Menu API failed, using mock data')
      },
      select: (response) => {
        let items = response.data || []
        
        // Apply search filter
        if (searchTerm) {
          items = items.filter((item: MenuItem) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
        
        // Apply category filter
        if (selectedCategory !== 'ALL') {
          items = items.filter((item: MenuItem) => item.category === selectedCategory)
        }
        
        // Apply other filters
        if (filters.vegetarian) {
          items = items.filter((item: MenuItem) => item.isVegetarian)
        }
        if (filters.spicy) {
          items = items.filter((item: MenuItem) => item.isSpicy)
        }
        if (filters.lowCalorie) {
          items = items.filter((item: MenuItem) => item.calories && item.calories < 500)
        }
        
        // Apply sorting
        items.sort((a: MenuItem, b: MenuItem) => {
          switch (sortBy) {
            case 'price-low':
              return a.price - b.price
            case 'price-high':
              return b.price - a.price
            case 'name':
              return a.name.localeCompare(b.name)
            case 'popularity':
              return Math.random() - 0.5 // Mock popularity sorting
            default:
              return 0
          }
        })
        
        return items
      }
    }
  )

  // Function to process menu items with filters and sorting
  const processMenuItems = (items: MenuItem[]) => {
    let processedItems = [...items]
    
    // Apply search filter
    if (searchTerm) {
      processedItems = processedItems.filter((item: MenuItem) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply category filter
    if (selectedCategory !== 'ALL') {
      processedItems = processedItems.filter((item: MenuItem) => item.category === selectedCategory)
    }
    
    // Apply other filters
    if (filters.vegetarian) {
      processedItems = processedItems.filter((item: MenuItem) => item.isVegetarian)
    }
    if (filters.spicy) {
      processedItems = processedItems.filter((item: MenuItem) => item.isSpicy)
    }
    if (filters.lowCalorie) {
      processedItems = processedItems.filter((item: MenuItem) => item.calories && item.calories < 500)
    }
    
    // Apply sorting
    processedItems.sort((a: MenuItem, b: MenuItem) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'popularity':
          return Math.random() - 0.5 // Mock popularity sorting
        default:
          return 0
      }
    })
    
    return processedItems
  }

  // Use mock data if API fails
  const displayItems = error ? processMenuItems(mockMenuItems) : menuItems

  const categories = [
    { id: 'ALL', name: 'All Items', count: displayItems?.length || 0 },
    { id: 'PIZZA', name: 'Pizza', count: 0 },
    { id: 'BURGER', name: 'Burgers', count: 0 },
    { id: 'PASTA', name: 'Pasta', count: 0 },
    { id: 'SALAD', name: 'Salads', count: 0 },
    { id: 'APPETIZER', name: 'Appetizers', count: 0 },
    { id: 'DESSERT', name: 'Desserts', count: 0 },
    { id: 'BEVERAGE', name: 'Beverages', count: 0 }
  ]

  const handleAddToCart = (item: MenuItem) => {
    addItem(item)
    toast.success(`Added ${item.name} to cart`)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('ALL')
    setSortBy('name')
    setFilters({
      vegetarian: false,
      spicy: false,
      lowCalorie: false
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container py-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Menu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover our delicious selection of freshly prepared dishes
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Menu
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for dishes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-400">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>

              {/* Filters */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <Filter size={20} />
                  </button>
                </div>
                
                {showFilters && (
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.vegetarian}
                        onChange={(e) => setFilters({ ...filters, vegetarian: e.target.checked })}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Vegetarian</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.spicy}
                        onChange={(e) => setFilters({ ...filters, spicy: e.target.checked })}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Spicy</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.lowCalorie}
                        onChange={(e) => setFilters({ ...filters, lowCalorie: e.target.checked })}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Low Calorie (&lt;500)</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center py-2"
              >
                <X size={16} className="mr-1" />
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-xl p-6">
                    <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            ) : displayItems && displayItems.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    Showing {displayItems.length} items
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayItems.map((item: MenuItem) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={item.imageUrl || `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop`}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop'
                          }}
                        />
                        
                        {/* Quick Add Button */}
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-50 hover:text-primary-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Plus size={20} />
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
                      <div className="p-6">
                        <h3 className="font-semibold text-xl text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
                          <span className="font-bold text-2xl text-gray-900">
                            {formatPrice(item.price)}
                          </span>
                          
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="btn-primary px-6 py-2"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No items found matching your criteria</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-primary-600 hover:text-primary-700"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
