import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedMenu } from '@/components/sections/FeaturedMenu'
import { Categories } from '@/components/sections/Categories'
import { Testimonials } from '@/components/sections/Testimonials'
import { Newsletter } from '@/components/sections/Newsletter'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Categories />
      <FeaturedMenu />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
