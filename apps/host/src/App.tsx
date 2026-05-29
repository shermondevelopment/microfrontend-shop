import { lazy, Suspense } from 'react'
import { HeaderSkeleton } from '@microfrontend/ui'
import { ProductSkeleton } from '@microfrontend/ui'

const Header = lazy(() => import('header/Header'))
const Footer = lazy(() => import('footer/Footer'))
const ProductsList = lazy(() => import('products/ProductsList'))

function App() {
  return (
    <main className="flex min-h-screen flex-col bg-green-50">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      <section className="flex-1 px-6 py-8">
        <Suspense fallback={<ProductSkeleton />}>
          <ProductsList />
        </Suspense>
      </section>

      <Suspense fallback={<div>Carregando footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default App
