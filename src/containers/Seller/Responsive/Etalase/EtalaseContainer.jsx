import { EtalaseItem } from "./EtalaseItem";

const EtalaseContainer = ({
    etalaseData,
    productsWithFavorites,
    setIsEtalasePage
  }) => {
  const categories = [
    {
      id: 1,
      name: "Semua Produk",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4f7d80a25bafc91566a2825de205d5aea42a9fa256aaa5722fffb47d2f1180e?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa96d47395c849d89aef11b76aadbd1487b01b986404063ae4c17a86d291a247?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"
    },
    {
      id: 2,
      name: "Suku Cadang",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4f7d80a25bafc91566a2825de205d5aea42a9fa256aaa5722fffb47d2f1180e?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/49e4a15a86a02bbf0df588b777652321e107a24db28f63c28cc8565caf74da25?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"
    },
    {
      id: 3,
      name: "Peralatan Perlengkapan",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/a4f7d80a25bafc91566a2825de205d5aea42a9fa256aaa5722fffb47d2f1180e?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a",
      iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/3de6b767ff33cbfdff43777492db43ed76af9db31518ebe62b08d9b483508150?placeholderIfAbsent=true&apiKey=60cdcdaf919148d9b5b739827a6f5b2a"
    }
  ];
  
  return (
    <div className="flex flex-col p-4 text-black">
      <div className="flex flex-col max-w-full w-[328px]">
        <div className="flex flex-col w-full">
          {categories.map((category, index) => (
            <div key={index} onClick={() => setIsEtalasePage(true)}>
              <EtalaseItem
                name={category.name}
                imageUrl={category.imageUrl}
                iconUrl={category.iconUrl}
                isLast={index === categories.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EtalaseContainer