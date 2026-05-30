import { lazy, Suspense } from 'react'
import { HeaderSkeleton, ProductSkeleton, FooterSkeleton } from '@microfrontend/ui'

const Header = lazy(() => import('header/Header'))
const Footer = lazy(() => import('footer/Footer'))
const ProductsList = lazy(() => import('products/ProductsList'))

function App() {
  return (
    <main className="flex min-h-screen flex-col">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <section className="flex-1 px-6 py-8">
        <Suspense fallback={<ProductSkeleton />}>
          <ProductsList />
        </Suspense>
      </section>

      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default App
