import { useState, useEffect, useRef } from "react";
import ProductComponent from "../ProductComponent/ProductComponent";
import Button from "../Button/Button";

/**
 * ProductGrid component displays a grid of products with lazy loading functionality.
 *
 * @param {Object} props - The component props.
 * @param {number} [props.initialLoadCount=18] - The initial number of products to load.
 * @param {number} [props.batchSize=18] - The number of products to load in each batch.
 * @param {Array} [props.totalProducts=[]] - The total list of products to display.
 * @param {number} [props.maxAutoLoad=36] - The maximum number of products to auto-load.
 * @param {number} [props.buttonThreshold=24] - The number of products after which the load more button is shown.
 * @param {string} [props.title="Produk Yang Banyak Dikunjungi"] - The title of the product grid section.
 *
 * @returns {JSX.Element} The rendered ProductGrid component.
 */
const ProductGrid = ({
  initialLoadCount = 18,
  batchSize = 18,
  totalProducts = [],
  maxAutoLoad = 36,
  buttonThreshold = 24,
  title = "Produk Yang Banyak Dikunjungi",
}) => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    setVisibleProducts(totalProducts.slice(0, initialLoadCount));
  }, [totalProducts, initialLoadCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && visibleProducts.length < maxAutoLoad) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [visibleProducts]);

  const loadMoreProducts = () => {
    if (loading) return;

    setLoading(true);
    const currentLength = visibleProducts.length;
    const nextBatch = totalProducts.slice(
      currentLength,
      currentLength + batchSize
    );

    setTimeout(() => {
      setVisibleProducts((prev) => [...prev, ...nextBatch]);
      setLoading(false);
    }, 500); // Simulated loading delay
  };

  const showLoadMoreButton =
    totalProducts.length > buttonThreshold &&
    visibleProducts.length < totalProducts.length;

  return (
    <section className="bg-white py-6">
      <div className="w-full max-w-[1080px] mx-auto space-y-7">
        <h1 className="text-neutral-900 font-bold text-lg">{title}</h1>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {visibleProducts.map((product) => (
            <ProductComponent
              key={product.id}
              {...product}
              image={`https://prd.place/170?id=2`}
            />
          ))}
        </div>

        <div ref={observerRef} className="h-4" />

        {showLoadMoreButton && (
          <div className="flex justify-center">
            <Button
              ref={loadMoreRef}
              onClick={loadMoreProducts}
              disabled={loading}
              className="place-self-center"
            >
              {loading ? "Memuat..." : "Muat Lebih Banyak"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
