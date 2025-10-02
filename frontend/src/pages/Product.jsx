import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ShopContext from '../context/ShopContext'
import {assets} from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return;
      }
    })
  }
console.log(productData.image)
  useEffect(() => {
      fetchProductData();
  }, [productId, products])

  // console.log(productData.image)

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto gap-3 sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} alt="Product-Image" className='w-24 sm:w-full flex-shrink-0 cursor-pointer'/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full' alt="" />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1 '>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex gap-1 mt-2 items-center'>
            <img src={assets.star_icon} alt="Star Icon" />
            <img src={assets.star_icon} alt="Star Icon" />
            <img src={assets.star_icon} alt="Star Icon" />
            <img src={assets.star_icon} alt="Star Icon" />
            <img src={assets.star_dull_icon} alt="Star Dull Icon" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
              <button onClick={() => setSize(item)} key={index} className={`border-2 border-gray-100 px-4 py-2 ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-sm text-white px-10 py-3 hover:scale-105 transition ease-in-out'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Origional Product</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border rounded px-5 py-3 font-bold text-sm'>Description</p>
          <p className='border rounded px-5 py-3 text-sm'>Reviews</p>
        </div>
        <div className='flex flex-col gap-4 rounded border px-6 py-6 text-sm text-gray-500'>
          <p>An Ecommerce website is an online platform that allows users to buy and sell products or services over the internet.</p>
          <p>Ecommerce websites typically displays products and services for sale, and allows users to place orders and make payments online.</p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
