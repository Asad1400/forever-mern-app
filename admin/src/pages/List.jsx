import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (e) {
      console.log(e.message)
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(backendUrl + '/api/product/remove', {
        data: { id },
        headers: { token },
      })
      if (response.data.success) {
        setList((prev) => prev.filter((item) => item._id !== id))
        toast.success('Product removed successfully')
      } else {
        toast.error(response.data.message)
      }
    } catch (e) {
      console.log(e.message)
      toast.error(e.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div>
      <p className="mb-2 font-semibold">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        {list.length > 0 && !loading && (
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span className="text-center">Action</span>
          </div>
        )}

        {/* Loading, Empty State, or Product List */}
        {loading ? (
          <p className="text-center py-4 text-gray-500">Loading products...</p>
        ) : list.length > 0 ? (
          list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border"
            >
              <img
                className="w-12 h-12 object-cover"
                src={item.image[0]}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-lg text-red-500"
              >
                ✖
              </p>
            </div>
          ))
        ) : (
          <p className="text-center py-4 text-gray-500">No products available</p>
        )}
      </div>
    </div>
  )
}

export default List
