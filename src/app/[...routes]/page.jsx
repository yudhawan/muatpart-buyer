
import CategoriesPage from '@/containers/CategoriesPage/CategoriesPage';
import DetailProductPage from '@/containers/DetailProductPage/DetailProductPage';
import categoriesServices from '@/services/categoriesServices';
import productsServices from '@/services/productsServices';
import { notFound } from 'next/navigation';

async function Page(props) {
    const fetchCategories = await categoriesServices.fetchCategories()
    const fetchProductDetail=await productsServices.fetchProductDetail()
    
    if(props?.params?.routes?.[0]==='categories') return <CategoriesPage allCategories={fetchCategories?.Data} params={props?.params?.routes} searchParams={props?.searchParams} />
    if(props?.params?.routes?.[0]==='detail') return <DetailProductPage product={fetchProductDetail?.Data} />
    return notFound()
}

export default Page;
  