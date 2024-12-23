import ProductSlider from "./ProductSlider";

export default function ProductSection({ title, products, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProductSlider 
      title={title}
      products={products}
    />
  );
}