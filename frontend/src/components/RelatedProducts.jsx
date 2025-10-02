import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice();

            if (category.length > 0) {
                productCopy = productCopy.filter((product) => category.includes(product.category));
            }

            if (subCategory.length > 0) {
                productCopy = productCopy.filter((product) => subCategory.includes(product.subCategory));
            }

            console.log(productCopy.slice(0, 5))

            setRelatedProducts(productCopy.slice(0, 5));
        }
    }, [])

    return (
        <div className='my-16'>
            <div className='text-center text-3xl py-2'>
                <Title text_1={"RELATED"} text_2={"PRODUCTS"}/>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    relatedProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts
