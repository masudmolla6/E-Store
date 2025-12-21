import React from 'react'
import { useLoaderData } from 'react-router'

const EditProduct = () => {
  const product=useLoaderData();
  console.log(product);
  return (
    <div>
      EditProduct.
    </div>
  )
}

export default EditProduct
