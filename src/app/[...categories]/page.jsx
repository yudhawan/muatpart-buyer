
import Categories from './Categories';

function Page(props) {
    console.log(props)
    return (
        <div className='w-full'>
            <Categories {...props} />
        </div>
    );
}

export default Page;
  