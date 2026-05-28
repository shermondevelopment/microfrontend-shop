import { lazy, Suspense } from 'react'

const Header = lazy(() => import('header/Header'))

function App() {
  return (
    <main>
      <Suspense fallback={<div>Carregando header...</div>}>
        <Header />
      </Suspense>
    </main>
  )
}

export default App
