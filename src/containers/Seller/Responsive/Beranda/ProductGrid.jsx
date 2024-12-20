import { Fragment } from "react";
import { ProductCard } from "../../Web/Beranda/Product/ProductSlider";

const products = [
  {
    id: 1,
    name: "Piston Nissan Diesel",
    originalPrice: "Rp5.000.000",
    discount: "10%",
    price: "Rp4.200.000",
    warranty: "Garansi 3 Bulan",
    seller: "SparePro",
    rating: "4.8",
    sales: "20,9 rb",
    location: "Surabaya",
    quality: "Genuine",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9d98563f3ea7905e2d3c6a50b10f745184b2fe08af762ba6b1daba221a117462?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"
  },
  // Add other products data here
];

export default function ProductGrid({ title, products }) {
  if (!products || products.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="text-base font-semibold leading-none text-black">
        {title}
      </div>
      <div className="flex overflow-x-auto scrollbar-none w-[calc(100vw_-_16px)]">
        <div className="flex gap-2 items-center w-full">
          {products.map((product, key) => (
            <Fragment key={key}>
              <ProductCard {...product} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}