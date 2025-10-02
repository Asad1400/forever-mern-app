import React, { useState, useContext, useEffect } from "react";
import ShopContext from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    cartItems,
    currency,
    updateQuantity,
    navigate,
    deleteFromCart,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text_1={"YOUR"} text_2={"CART"} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Your cart is empty</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            return productData ? (
              <div
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                key={index}
              >
                <div className="flex items-center gap-6">
                  <img
                    src={productData.image[0]}
                    className="w-16 sm:w-20"
                    alt=""
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value);
                    if (!item._id || !item.size) {
                      console.error("Invalid cart item:", item);
                      return;
                    }
                    if (newQuantity > 0) {
                      updateQuantity(item._id, item.size, newQuantity);
                    }
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                />
                <img
                  onClick={() => deleteFromCart(item._id, item.size)}
                  src={assets.bin_icon}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  alt="Delete"
                />
              </div>
            ) : null;
          })
        )}
      </div>

      <div className="flex justify-end  my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/placeorder")}
              className="bg-black text-white text-sm my-8 px-8 py-3 hover:scale-105 transition ease-in-out"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
