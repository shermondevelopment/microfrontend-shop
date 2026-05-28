import './index.css'
import { useQuery } from '@tanstack/react-query'
import { productsQuery } from './api'

function ProductsList() {
  const { data, error, isLoading } = useQuery(productsQuery)

  if (isLoading) {
    return <p className="text-sm text-slate-500">Carregando produtos...</p>
  }

  if (error) {
    return <p className="text-sm text-red-600">Nao foi possivel carregar os produtos.</p>
  }

  return (
    <section className="mx-auto max-w-5xl">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Produtos</h2>

      <ul className="space-y-2">
        {data?.products.map((product) => (
          <li key={product.id} className="rounded border border-slate-200 bg-white px-4 py-3">
            <h3 className="font-medium text-slate-800">{product.title}</h3>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductsList
