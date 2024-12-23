
import CategoriesPage from '@/containers/CategoriesPage/CategoriesPage';
import DetailProductPage from '@/containers/DetailProductPage/DetailProductPage';
import categoriesServices from '@/services/categoriesServices';
import productsServices from '@/services/productsServices';
import { notFound } from 'next/navigation';

async function Page(props) {
    const fetchCategories = await categoriesServices.fetchCategories()
    const fetchProductDetail=await productsServices.fetchProductDetail()
    console.log(fetchProductDetail,'fetchProductDetail')
    if(props?.params?.routes?.[0]==='categories') return <CategoriesPage allCategories={fetchCategories?.Data??[]} params={props?.params?.routes} searchParams={props?.searchParams} {...props} />
    if(props?.params?.routes?.[0]==='detail') return <DetailProductPage product={fetchProductDetail?.Data??[]} {...props} />
    return notFound()
}

export default Page;
  