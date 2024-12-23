import ConfigUrl from "./baseConfig"

class ProductsServices extends ConfigUrl{
    constructor(url,options) {
        super()
        this.option=options
        this.error=null
        this.loading=false
        console.log(this.url,'terr')
    }
    async fetchProductDetail(){
        try {
            const response= await this.get(null,{
                url:'http://192.168.7.77:3011/v1/muatparts/product/39685673-155e-4d64-a6b2-83b0d483ab1f'
            })
            return response.data
        } catch (error) {
            console.log(error,'ERRRRR TERRRR')
        }
    }
}

const productsServices=new ProductsServices()
export default productsServices