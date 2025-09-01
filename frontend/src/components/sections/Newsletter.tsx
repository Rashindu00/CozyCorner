'use client'

import { useState } from 'react'
import { Mail, Send, Check, Gift, Bell, Utensils } from 'lucide-react'
import toast from 'react-hot-toast'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubscribing(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock success
      setIsSubscribed(true)
      toast.success('Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  const benefits = [
    {
      icon: Gift,
      title: 'Exclusive Deals',
      description: 'Get access to special offers and discounts before anyone else'
    },
    {
      icon: Bell,
      title: 'Early Access',
      description: 'Be the first to know about new menu items and seasonal specials'
    },
    {
      icon: Utensils,
      title: 'Recipe Tips',
      description: 'Receive cooking tips and behind-the-scenes content from our chefs'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
              <Mail size={32} />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Stay in the Loop
            </h2>
            
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss out on delicious deals, 
              new menu items, and exclusive offers delivered straight to your inbox.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mb-12">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                      disabled={isSubscribing}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-6 py-3 bg-primary-500 hover:bg-primary-400 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubscribing ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      <>
                        Subscribe
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
                
                <p className="text-sm text-primary-100 mt-4">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Welcome to the Family!</h3>
                <p className="text-primary-100">
                  You're all set! Check your email for a welcome message and your first exclusive offer.
                </p>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mb-4">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-100 text-sm">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-white border-opacity-20">
            <p className="text-primary-100 text-sm">
              Join over <span className="font-semibold text-white">5,000+ food lovers</span> who already receive our weekly newsletter
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
