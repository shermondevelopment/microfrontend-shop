import { lazy, Suspense } from 'react'
import { HeaderSkeleton } from '@microfrontend/ui'

const Header = lazy(() => import('header/Header'))
const Footer = lazy(() => import('footer/Footer'))

function App() {
  return (
    <main className="flex min-h-screen flex-col bg-green-50">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Carregando footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default App
