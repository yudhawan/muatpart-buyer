
import { fetchCategories } from '@/services/categoriesServices';
import Products from './Products';

async function Page(props) {
    const getAllCategories=await fetchCategories()
    return (
        <div className='w-full'>
            <Products allCategories={getAllCategories??[]} searchParams={props.searchParams} />
        </div>
    );
}

export default Page;
  