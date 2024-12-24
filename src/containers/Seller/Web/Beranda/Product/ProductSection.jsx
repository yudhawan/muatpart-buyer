import ProductSlider from "./ProductSlider";

export default function ProductSection({ title, products, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }
console.log("pro",products)
  return (
    <ProductSlider 
      title={title}
      products={products}
    />
  );
}