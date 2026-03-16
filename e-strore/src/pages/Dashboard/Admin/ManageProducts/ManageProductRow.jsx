import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import useAllProducts from "../../../../hooks/useAllProducts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageProductRow = ({ product, index }) => {

  const { name, image, price, category } = product;

  const { refetch } = useAllProducts();
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {

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
          .then((res) => {

            if (res.data.deletedCount > 0) {

              Swal.fire({
                title: "Deleted!",
                text: "Product has been deleted.",
                icon: "success",
              });

              refetch();

            }

          });

      }

    });

  };

  return (

    <tr className="hover:bg-base-200 transition duration-300">

      <td className="font-semibold">{index + 1}</td>

      {/* Product Image */}

      <td>
        <div className="avatar">
          <div className="w-14 h-14 rounded-lg shadow">
            <img src={image} alt={name} />
          </div>
        </div>
      </td>

      {/* Product Name */}

      <td className="max-w-[180px]">
        <p className="font-semibold line-clamp-2">{name}</p>
      </td>

      {/* Price */}

      <td>
        <span className="font-bold text-green-600">৳{price}</span>
      </td>

      {/* Category */}

      <td>
        <span className="badge badge-outline badge-primary">
          {category}
        </span>
      </td>

      {/* Actions */}

      <td>

        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">

          <Link
            to={`edit-product/${product._id}`}
            className="btn btn-xs sm:btn-sm btn-info text-white flex items-center gap-1"
          >
            <FiEdit />
            <span className="hidden sm:inline">Edit</span>
          </Link>

          <button
            onClick={() => handleDelete(product._id)}
            className="btn btn-xs sm:btn-sm btn-error text-white flex items-center gap-1"
          >
            <FiTrash2 />
            <span className="hidden sm:inline">Delete</span>
          </button>

        </div>

      </td>

    </tr>

  );

};

export default ManageProductRow;