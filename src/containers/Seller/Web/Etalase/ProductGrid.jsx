import { ProductCard } from '../Beranda/Product/ProductSlider';

const ProductGrid = ({ products }) => {
  return (
    <div 
      className="grid gap-3 w-[914px]"
      style={{
        gridTemplateColumns: 'repeat(5, 170px)', // 5 columns of 170px each
      }}
    >
      {products.map((product, index) => (
        <div 
          key={`etalase-product-${index}`} 
          className="flex"  // This ensures the card stretches within its grid cell
        >
          <ProductCard
            {...product} 
            className="flex-1" // This ensures the card takes full height of its container
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;