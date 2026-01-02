import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AddProducts = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      variants: [{ color: "", size: "", stock: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (data) => {
    const newProduct = {
      ...data,
      price: Number(data.price),
      discountPrice: Number(data.discountPrice),
      stock: Number(data.stock),
      ratings: Number(data.ratings),
      featured: Boolean(data.featured),
      variants: data.variants.map((v) => ({
        ...v,
        stock: Number(v.stock),
      })),
    };

    console.log("NEW PRODUCT:", newProduct);

    // await axiosSecure.post("/products", newProduct);
    // navigate("/dashboard/manageProducts");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input {...register("name", { required: true })} placeholder="Product Name" className="input input-bordered w-full" />
        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />

        <div className="grid grid-cols-2 gap-4">
          <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered" />
          <input type="number" {...register("discountPrice")} placeholder="Discount Price" className="input input-bordered" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input {...register("category")} placeholder="Category" className="input input-bordered" />
          <input {...register("subcategory")} placeholder="Subcategory" className="input input-bordered" />
        </div>

        <input {...register("brand")} placeholder="Brand" className="input input-bordered w-full" />
        <input {...register("image")} placeholder="Image URL" className="input input-bordered w-full" />

        <div className="grid grid-cols-2 gap-4">
          <input type="number" {...register("stock", { required: true })} placeholder="Total Stock" className="input input-bordered" />
          <input type="number" step="0.1" {...register("ratings")} placeholder="Ratings" className="input input-bordered" />
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("featured")} />
          Featured Product
        </label>

        {/* 🔥 Variants Section */}
        <div>
          <h3 className="font-semibold mb-2">Variants</h3>

          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-4 gap-2 mb-2">
              <input {...register(`variants.${index}.color`)} placeholder="Color" className="input input-bordered" />
              <input {...register(`variants.${index}.size`)} placeholder="Size" className="input input-bordered" />
              <input type="number" {...register(`variants.${index}.stock`)} placeholder="Stock" className="input input-bordered" />

              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-error btn-sm"
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ color: "", size: "", stock: "" })}
            className="btn btn-outline btn-sm mt-2"
          >
            + Add Variant
          </button>
        </div>

        <button disabled={isSubmitting} className="btn btn-primary w-full">
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
