import React, { useContext, useEffect, useState} from 'react'
import ShopContext from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    }, [location]);

return showSearch && visible ? (
        <div className='border-t border-b text-center bg-gray-50'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 w-3/4 sm:w-1/2 rounded-3xl'>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' placeholder='Search'/>
                <img src={assets.search_icon} className='w-4' alt="Search-Icon" />
            </div>
            <img src={assets.cross_icon} onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' alt="Cross-Icon" />
        </div>
    ) : null
}

export default SearchBar
