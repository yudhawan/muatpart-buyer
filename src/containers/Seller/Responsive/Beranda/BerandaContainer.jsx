import ProductGrid from "./ProductGrid"

const BerandaContainer = ({
  products,
  productsWithFavorites
}) => {
  return (
    <div className="flex flex-col items-start pt-5 pl-4 gap-y-6 max-w-full w-[344px]">
      <ProductGrid title="Produk Terlaris" products={productsWithFavorites(products.bestSeller)} />
      <ProductGrid title="Produk Terfavorit" products={productsWithFavorites(products.favorite)} />
      <ProductGrid title="Produk Terbaru" products={productsWithFavorites(products.new)} />
    </div>
  )
}

export default BerandaContainer