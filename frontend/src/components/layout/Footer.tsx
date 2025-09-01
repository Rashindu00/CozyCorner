'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="font-display text-2xl font-bold">
                CozyCorner
              </span>
            </Link>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Delicious food delivered fresh to your door. Experience the best flavors 
              with our carefully crafted dishes made from premium ingredients.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/menu" className="block text-gray-300 hover:text-white transition-colors">
                Menu
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/careers" className="block text-gray-300 hover:text-white transition-colors">
                Careers
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail size={16} />
                <span>hello@cozycorner.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin size={16} />
                <span>123 Food Street, City, State 12345</span>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Opening Hours</h4>
              <div className="text-sm text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Mon - Thu:</span>
                  <span>10:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri - Sat:</span>
                  <span>10:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>11:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} CozyCorner. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
