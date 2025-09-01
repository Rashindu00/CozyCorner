'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Blogger',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b587?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'CozyCorner has become my go-to place for amazing food! The pizza is absolutely incredible, and the delivery is always super fast. Highly recommend!',
    location: 'New York'
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Local Customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Best burgers in town! The quality is consistently excellent, and the staff is always friendly. The online ordering system makes it so convenient.',
    location: 'California'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Regular Customer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'I love the variety of healthy options! The salads are fresh and delicious, and I appreciate that they cater to different dietary needs.',
    location: 'Texas'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Business Owner',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'Perfect for office catering! They handle large orders professionally and the food always arrives on time. Great customer service too.',
    location: 'Seattle'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Family Customer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    text: 'My kids absolutely love their meals here! The portions are generous and the taste is amazing. It has become our family favorite.',
    location: 'Florida'
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ))
  }

  return (
    <section className="py-16 bg-primary-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy customers have to say about their experience
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-primary-100">
              <Quote size={48} />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center mb-6">
                {renderStars(testimonials[currentIndex].rating)}
                <span className="ml-2 text-sm text-gray-600">
                  {testimonials[currentIndex].rating}.0
                </span>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-20"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-20"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-primary-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              10,000+
            </div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              4.9
            </div>
            <div className="text-gray-600 flex items-center justify-center">
              Average Rating
              <div className="flex ml-2">
                {renderStars(5)}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              50,000+
            </div>
            <div className="text-gray-600">Orders Delivered</div>
          </div>
        </div>
      </div>
    </section>
  )
}
