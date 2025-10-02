import React, { useContext, useEffect, useState } from 'react'
import ShopContext from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item !== e.target.value));
    }
    else {
      setCategory([...category, e.target.value]);
    }
  }
  
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    }
    else {
      setSubCategory([...subCategory, e.target.value]);
    }
  }

  const applyFilters = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((product) => category.includes(product.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((product) => subCategory.includes(product.subCategory));
    }

    setFilteredProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filteredProducts.slice();
    
    switch (sortType) {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setFilteredProducts(products);
  }, [])

  useEffect(() => {
    applyFilters()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Fliter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : '' }`} alt="Dropdown-Icon"/>
        </p>
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-6 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-xs font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>

        {/* Sub-Category Filter */}
        <div className={`border border-gray-300 pl-5 py-6 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-xs font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text_1={"ALL"} text_2={"COLLECTIONS"}/>
          {/* Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        
        {/* Map Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
          {
            filteredProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
          }
        </div>        
      </div>
    </div>
  )
}

export default Collection
