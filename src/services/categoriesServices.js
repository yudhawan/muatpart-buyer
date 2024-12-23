import ConfigUrl from "./baseConfig"

class CategoriesServices extends ConfigUrl {
    constructor(url,options) {
        super()
        this.options=options
    }
    async fetchCategories() {
        try {
            const response = this.get('muatparts/product/category')
            return (await response).data
        } catch (error) {
            return []
        }
    }
}

const categoriesServices = new CategoriesServices()
export default categoriesServices