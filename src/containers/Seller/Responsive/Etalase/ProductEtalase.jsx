import ListEtalaseProduct from "./ListEtalaseProduct"

const ProductEtalase = ({
    etalaseData,
    productsWithFavorites
}) => {
    return (
        <div className="py-5 px-4">
            <ListEtalaseProduct products={productsWithFavorites(etalaseData.products)} />
        </div>
    )
}

export default ProductEtalase