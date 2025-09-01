'use client'

import Link from 'next/link'
import { Pizza, Sandwich, Coffee, IceCream, Salad, ChefHat } from 'lucide-react'

const categories = [
  {
    id: 'pizza',
    name: 'Pizza',
    description: 'Fresh ingredients, crispy crust',
    icon: Pizza,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    itemCount: '12+ items'
  },
  {
    id: 'burgers',
    name: 'Burgers',
    description: 'Juicy beef, fresh toppings',
    icon: Sandwich,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
    itemCount: '8+ items'
  },
  {
    id: 'beverages',
    name: 'Beverages',
    description: 'Fresh drinks & smoothies',
    icon: Coffee,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop',
    itemCount: '15+ items'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet treats & ice cream',
    icon: IceCream,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop',
    itemCount: '6+ items'
  },
  {
    id: 'salads',
    name: 'Salads',
    description: 'Fresh, healthy options',
    icon: Salad,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    itemCount: '10+ items'
  },
  {
    id: 'appetizers',
    name: 'Appetizers',
    description: 'Perfect starters',
    icon: ChefHat,
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=300&h=200&fit=crop',
    itemCount: '7+ items'
  }
]

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse menu categories, each crafted with care and bursting with flavor
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.id}
                href={`/menu?category=${category.id}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Category Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <IconComponent size={24} className="text-primary-600" />
                  </div>

                  {/* Item Count Badge */}
                  <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 text-gray-900 text-sm font-medium px-3 py-1 rounded-full">
                    {category.itemCount}
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            View Full Menu
            <ChefHat size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
