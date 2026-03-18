import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddBanner = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [preview, setPreview] = useState(null);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);

      const imageFile = data.image[0];

      if (!imageFile) {
        alert("No image selected ❌");
        return;
      }

      const formData = new FormData();
      formData.append("image", imageFile);

      const apiKey = import.meta.env.VITE_image_upload_key;

      if (!apiKey) {
        console.error("API key missing!");
        return;
      }

      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

      const res = await axios.post(imageUploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("imgbb response:", res.data);

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;

        const bannerData = {
          title: data.title,
          discount: data.discount,
          buttonText: data.buttonText,
          buttonLink: data.buttonLink,
          image: imageUrl,
        };

        console.log("Final Banner Data:", bannerData);

        // 👉 backend later
        const res = await axios.post(
          "/banners",
          bannerData
        );

        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Banner Added!",
            text: "Your banner has been saved successfully 🚀",
            showConfirmButton: false,
            timer: 2000,
          });

          reset();
          setPreview(null);
        }

        reset();
        setPreview(null);

        alert("Banner added successfully 🚀");
      }
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/10">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-white">
          Add New Banner
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Title */}
          <input
            type="text"
            placeholder="Banner Title"
            {...register("title", { required: true })}
            className="w-full p-4 rounded-xl bg-white/20 text-white"
          />
          {errors.title && <p className="text-pink-400">Title is required</p>}

          {/* Discount */}
          <input
            type="text"
            placeholder="Discount (e.g., 50%)"
            {...register("discount", { required: true })}
            className="w-full p-4 rounded-xl bg-white/20"
          />
          {errors.discount && <p className="text-yellow-400">Discount is required</p>}

          {/* Button Text */}
          <input
            type="text"
            placeholder="Button Text"
            {...register("buttonText", { required: true })}
            className="w-full p-4 rounded-xl bg-white/20 text-white"
          />
          {errors.buttonText && <p className="text-green-400">Button text is required</p>}

          {/* Button Link */}
          <input
            type="text"
            placeholder="Button Link"
            {...register("buttonLink", { required: true })}
            className="w-full p-4 rounded-xl bg-white/20 text-white"
          />
          {errors.buttonLink && <p className="text-blue-400">Link is required</p>}

          {/* Image Upload */}
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              {...register("image", {
                required: true,
                onChange: handleImagePreview, // 🔥 FIXED
              })}
            />

            <label
              htmlFor="imageUpload"
              className="cursor-pointer px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold hover:scale-105 transition"
            >
              Choose Banner Image
            </label>

            {errors.image && (
              <p className="text-red-400">Image is required</p>
            )}

            {preview && (
              <>
                <p className="text-white/80 text-sm">Preview 👇</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-72 h-40 object-cover rounded-xl shadow-lg"
                />
              </>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 font-bold rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:scale-105 transition"
          >
            {isSubmitting ? "Uploading..." : "Add Banner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;