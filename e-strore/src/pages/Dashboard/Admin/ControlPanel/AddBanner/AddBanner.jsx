import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddBanner = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [preview, setPreview] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imgbbAPIKey = "YOUR_IMGBB_API_KEY"; // replace with your key
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: "POST",
        body: formData,
      });
      const imgbbData = await res.json();
      const imageURL = imgbbData.data.display_url;

      const bannerData = {
        title: data.title,
        discount: data.discount,
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
        image: imageURL,
      };

      await fetch("http://localhost:5000/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bannerData),
      });

      alert("🎉 Banner Added Successfully!");
      reset();
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add banner. Try again!");
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/10">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-lg">
          Add New Banner
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Title */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              {...register("title", { required: true })}
              className="peer w-full p-4 rounded-xl bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
            />
            <label className="absolute left-4 top-2 text-white/70 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-white/90 peer-focus:text-sm">
              Banner Title
            </label>
            {errors.title && <p className="text-pink-400 text-sm mt-1">Title is required</p>}
          </div>

          {/* Discount */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              {...register("discount", { required: true })}
              className="peer w-full p-4 rounded-xl bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
            />
            <label className="absolute left-4 top-2 text-white/70 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-white/90 peer-focus:text-sm">
              Discount (e.g., 50%)
            </label>
            {errors.discount && <p className="text-yellow-400 text-sm mt-1">Discount is required</p>}
          </div>

          {/* Button Text */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              {...register("buttonText", { required: true })}
              className="peer w-full p-4 rounded-xl bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            />
            <label className="absolute left-4 top-2 text-white/70 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-white/90 peer-focus:text-sm">
              Button Text
            </label>
            {errors.buttonText && <p className="text-green-400 text-sm mt-1">Button Text is required</p>}
          </div>

          {/* Button Link */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              {...register("buttonLink", { required: true })}
              className="peer w-full p-4 rounded-xl bg-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
            <label className="absolute left-4 top-2 text-white/70 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-white/90 peer-focus:text-sm">
              Button Link
            </label>
            {errors.buttonLink && <p className="text-blue-400 text-sm mt-1">Button Link is required</p>}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              {...register("image", { required: true })}
              onChange={handleImagePreview}
              className="text-white"
            />
            {errors.image && <p className="text-red-400 mt-1">Banner image is required</p>}

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-72 h-40 object-cover rounded-2xl border-4 border-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 shadow-lg transition-transform hover:scale-105"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 font-bold rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {isSubmitting ? "Adding..." : "Add Banner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;