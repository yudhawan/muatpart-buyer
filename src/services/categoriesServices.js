export async function fetchCategories() {
    try {
        return fetch(process.env.NEXT_PUBLIC_GLOBAL_API+'muatparts/product/category').then(a=>a.json())
    } catch (error) {
        return []
    }
}