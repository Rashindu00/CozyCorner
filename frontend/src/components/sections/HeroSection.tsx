'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Star, Truck } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-orange-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-orange-200/20"></div>
      
      <div className="relative container py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Delicious Food
              <span className="text-primary-500"> Delivered</span>
              <br />
              to Your Door
            </h1>
            
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              Order from our extensive menu of pizzas, burgers, and more. 
              Fresh ingredients, fast delivery, and amazing taste guaranteed.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors duration-200 group"
              >
                Order Now
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-primary-500 hover:text-primary-500 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-2">
                  <Clock className="w-6 h-6 text-primary-500" />
                </div>
                <div className="font-bold text-2xl text-gray-900">30min</div>
                <div className="text-sm text-gray-600">Avg Delivery</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-2">
                  <Star className="w-6 h-6 text-primary-500" />
                </div>
                <div className="font-bold text-2xl text-gray-900">4.8</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mx-auto mb-2">
                  <Truck className="w-6 h-6 text-primary-500" />
                </div>
                <div className="font-bold text-2xl text-gray-900">Free</div>
                <div className="text-sm text-gray-600">Delivery $25+</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/images/hero-food.jpg"
                alt="Delicious food"
                className="w-full h-auto rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop'
                }}
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 z-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">1000+ Orders</div>
                  <div className="text-sm text-gray-600">Delivered Today</div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-4 right-4 w-72 h-72 bg-primary-200 rounded-full opacity-20 -z-10"></div>
            <div className="absolute bottom-4 left-4 w-48 h-48 bg-orange-200 rounded-full opacity-20 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
