import React, { useContext } from 'react'
import ShopContext from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const total = getCartAmount() || 0;

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text_1={"CART"} text_2={"TOTALS"} />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p className='font-semibold'>Subtotal</p>
                    <p>{currency} {total}.00</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p className='font-semibold'>Shipping Fee</p>
                    <p>{currency} {delivery_fee}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p className='font-semibold'>Total</p>
                    <p className='font-semibold'>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</p>
                </div>
            </div>
        </div>
  )
}

export default CartTotal
