import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useAllProducts from "../../../../hooks/useAllProducts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageProductRow = ({ product, index }) => {
  const {name, image, price, category } = product;
  console.log(product);
  const {refetch}=useAllProducts();
  const axiosSecure=useAxiosSecure();

  const handleDelete=(id)=>{
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${id}`)
        .then((res)=>{
          console.log(res.data);
          if (res.data.deletedCount>0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Cart has been deleted.",
                icon: "success",
              });
              refetch();
          }
        })
      }
    });
  }

  const handleEdit = (id) => {
    // 🔥 navigate to edit page / open modal later
    console.log("Edit product:", id);
  };

  return (
    <tr className="hover:bg-base-200 transition">
      <td>{index}</td>

      <td>
        <div className="avatar">
          <div className="w-14 h-14 rounded">
            <img src={image} alt={name} />
          </div>
        </div>
      </td>

      <td>
        <p className="font-medium">{name}</p>
      </td>

      <td>
        <span className="font-semibold">৳{price}</span>
      </td>

      <td>
        <span className="badge badge-outline">{category}</span>
      </td>

      <td className="text-center space-x-2">
        <button
          onClick={()=>handleEdit(product._id)}
          className="btn btn-sm btn-outline btn-info"
          title="Edit Product"
        >
          <FiEdit />
        </button>

        <button
          onClick={()=>handleDelete(product._id)}
          className="btn btn-sm btn-outline btn-error"
          title="Delete Product"
        >
          <FiTrash2 />
        </button>
      </td>
    </tr>
  );
};

export default ManageProductRow;