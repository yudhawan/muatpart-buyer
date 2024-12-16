
import { fetchCategories } from '@/services/categoriesServices';
import Products from './Products';

async function Page() {
    const getAllCategories=await fetchCategories()
    return (
        <div className='w-full'>
            <Products allCategories={getAllCategories} />
        </div>
    );
}

export default Page;
  