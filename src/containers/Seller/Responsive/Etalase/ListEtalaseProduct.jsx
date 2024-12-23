import { Fragment } from "react"
import { ProductCard } from "../../Web/Beranda/Product/ProductSlider"

const ListEtalaseProduct = ({
    products
}) => {
    return (
        <div className="flex gap-2 flex-wrap">
            {products.map((product, key ) => (
                <Fragment key={key}>
                    <div className="flex">
                        <ProductCard
                            {...product} 
                            className="flex-1" // This ensures the card takes full height of its container
                        />
                    </div>
                </Fragment>
            ))}
        </div>
    )
}

export default ListEtalaseProduct