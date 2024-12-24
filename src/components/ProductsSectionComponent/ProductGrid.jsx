import { useState, useEffect, useRef } from "react";
import ProductComponent from "../ProductComponent/ProductComponent";
import Button from "../Button/Button";

const ProductGrid = ({
  initialLoadCount = 18,
  batchSize = 18,
  totalProducts = [],
  maxAutoLoad = 36,
  buttonThreshold = 24,
  title = "add title",
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
    }, 500);
  };

  const showLoadMoreButton =
    totalProducts.length > buttonThreshold &&
    visibleProducts.length < totalProducts.length;

  const getGridCols = (length) => {
    if (length === 2) return "grid-cols-2";
    if (length === 3) return "grid-cols-3";
    if (length === 4) return "grid-cols-4";
    if (length === 5) return "grid-cols-5";
    return "grid-cols-6";
  };

  return (
    <section className="bg-white py-6">
      <div className="w-full max-w-[1080px] mx-auto">
        <h1 className="text-neutral-900 font-bold text-lg pt-4 pb-7">
          {title}
        </h1>

        <div
          className={`w-full grid ${getGridCols(visibleProducts.length)} gap-3`}
        >
          {visibleProducts.map((product) => (
            <ProductComponent
              key={product.id}
              {...product}
              image={`https://prd.place/170?id=2`}
            />
          ))}
        </div>

        {totalProducts.length > 6 && <div ref={observerRef} className="h-8" />}

        {showLoadMoreButton && (
          <div className="flex justify-center mt-6">
            <Button
              ref={loadMoreRef}
              onClick={loadMoreProducts}
              disabled={loading}
              className={`place-self-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
