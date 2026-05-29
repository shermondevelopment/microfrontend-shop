type ProductCardProps = {
  image: string;
  name: string;
  weight: number;
  price: number;
};

export function ProductCard({ image, name, weight, price }: ProductCardProps) {

  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <div className="flex h-full flex-col rounded-xl border-2 border-green-700 bg-white p-8">
      <img src={image} alt={name} className="h-40 w-full object-contain" />

      <h3 className="mt-2 h-12 text-center text-base font-normal line-clamp-2">
        {name}
      </h3>

      <p className="text-center text-base">{weight}</p>

      <p className="text-center text-base font-medium">{priceFormatter.format(price)}</p>

      <button className="mt-auto h-11 rounded-lg bg-green-700 px-10 text-white">
        Adicionar
      </button>
    </div>
  );
}
