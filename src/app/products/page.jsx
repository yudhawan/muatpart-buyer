
import categoriesServices from '@/services/categoriesServices';
import Products from './Products';

async function Page(props) {
    const fetchCategories = await categoriesServices.fetchCategories()
    if(props?.searchParams?.detail) return 
    return (
        <div className='w-full'>
            <Products allCategories={fetchCategories??[]} searchParams={props.searchParams} />
        </div>
    );
}

export default Page;
  