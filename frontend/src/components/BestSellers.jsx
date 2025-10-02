import React, {useContext, useEffect, useState} from 'react'
import ShopContext from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSellers = () => {

    const { products } = useContext(ShopContext);
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const bestProducts = products.filter((item) => item.bestSeller);
        setBestSellers(bestProducts.slice(0, 5));
        console.log(bestSellers)
      }, [products]);

    // console.log(bestSellers)
    
    return (
    <div className='my-7'>
      <div className='text-center text-3xl py-4'>
        <Title text_1={"Best"} text_2={"Sellers"}/>
        <p className='w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-500'>Check out our Best Sellers</p>
      </div>

      {/* Rendering Best Sellers */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-4'>
        {
            bestSellers.map((item, index) => (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
        }
      </div>
    </div>
  )
}

export default BestSellers
