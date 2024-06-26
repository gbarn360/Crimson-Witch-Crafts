import ItemThumbnail from './ItemThumbnail';
import Link from 'next/link';
import Item from '@/app/Interfaces';

export default function ContentContainer({items}:{items:Item[]}) {

    return (
        <div className="mt-10 mx-auto pt-5 md:w-5/6 min-h-screen">
                
                <div className='flex flex-wrap '>
                    {items.map((item: Item, index: number) => (
                   <Link key={index} href={`/products?id=${item.id}`} as={`/products/${item.id}`} className='m-auto sm:m-0 p-5 sm:w-1/2 md:w-1/2 lg:w-1/3  2xl:w-1/4'>
                    <ItemThumbnail item={item} />
                    </Link>
                ))}
                </div> 
                
            
        </div>
    );
}
