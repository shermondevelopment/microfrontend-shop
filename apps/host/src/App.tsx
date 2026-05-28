import { lazy, Suspense } from 'react'

const Header = lazy(() => import('header/Header'))
const Footer = lazy(() => import('footer/Footer'))

function App() {
  return (
    <main className="flex min-h-screen flex-col bg-green-50">
      <Suspense fallback={<div>Carregando header...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Carregando footer...</div>}>
        <Footer />
      </Suspense>
    </main>
  )
}

export default App
