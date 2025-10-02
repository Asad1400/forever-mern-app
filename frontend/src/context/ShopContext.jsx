// ShopContext.jsx
import React, { useEffect, useState } from 'react';
import ShopContext from './ShopContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  // ----------------- CART -----------------
  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (e) {
        console.log(e);
        toast.error(e.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    if (!itemId || !size) {
      console.error("Invalid updateQuantity call:", { itemId, size, quantity });
      return;
    }

    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        const res = await axios.put(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },  
          { headers: { token } }
        );
        console.log("Update response:", res.data);
      } catch (e) {
        console.error("Update error:", e);
        toast.error(e.message);
      }
    }
  };

  const getUserCart = async (jwtToken) => {
    if (!jwtToken) return;
    try {
      const response = await axios.get(backendUrl + "/api/cart/get", {
        headers: { token: jwtToken },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        setCartItems({});
      }
    } catch (e) {
      console.log(e);
      setCartItems({});
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue; 
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += cartItems[items][item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  // ----------------- PRODUCTS -----------------
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
    }
  };

  // DELETE FROM CART
  const deleteFromCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.delete(backendUrl + "/api/cart/delete", {
          headers: { token },
          data: { itemId, size },
        });
      } catch (e) {
        console.log(e);
        toast.error(e.message);
      }
    }
  };


  // ----------------- EFFECTS -----------------
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getUserCart(token);
    } else {
      setCartItems({});
      localStorage.removeItem("token");
    }
  }, [token]);

  // ----------------- CART COUNT -----------------
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    deleteFromCart
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
