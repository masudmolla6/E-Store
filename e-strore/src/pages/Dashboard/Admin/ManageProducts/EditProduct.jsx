import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const EditProduct = () => {
  const product = useLoaderData();
  const navigate = useNavigate();

  // 🧠 react-hook-form setup with default values
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      discountPrice: product?.discountPrice,
      category: product?.category,
      subcategory: product?.subcategory,
      brand: product?.brand,
      image: product?.image,
      stock: product?.stock,
      featured: product?.featured,
    },
  });

  // 🚀 Submit handler
  const onSubmit = async (data) => {
    console.log("Result", data);
    const updatedProduct = {
      ...data,
      price: Number(data.price),
      discountPrice: Number(data.discountPrice),
      stock: Number(data.stock),
    };

    console.log("Updated Product:", updatedProduct);

    // 🔥 TODO: PATCH / PUT API call here
    // await axiosSecure.patch(`/products/${product._id}`, updatedProduct)

    // navigate("/dashboard/manageProducts");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="label">Product Name</label>
          <input
            type="text"
            {...register("name", { required: "Product name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            rows="4"
            {...register("description")}
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Price Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Price</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Discount Price</label>
            <input
              type="number"
              {...register("discountPrice")}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Category</label>
            <input
              type="text"
              {...register("category", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Subcategory</label>
            <input
              type="text"
              {...register("subcategory")}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Brand</label>
            <input
              type="text"
              {...register("brand")}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="label">Image URL</label>
          <input
            type="text"
            {...register("image")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Stock & Featured */}
        <div className="flex items-center gap-6">
          <div>
            <label className="label">Stock</label>
            <input
              type="number"
              {...register("stock", { min: 0 })}
              className="input input-bordered w-40"
            />
          </div>

          <label className="flex items-center gap-2 mt-8">
            <input
              type="checkbox"
              {...register("featured")}
              className="checkbox"
            />
            Featured Product
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? "Updating..." : "Update Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;