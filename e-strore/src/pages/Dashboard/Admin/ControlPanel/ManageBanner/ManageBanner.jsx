import React from "react";
import useBannerList from "../../../../../hooks/useBannerList";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageBanner = () => {
  const [banners, loading, error, refetch] = useBannerList();
  const axiosPublic = useAxiosPublic();

  // ✅ Toggle Banner (Set / Remove)
  const handleToggle = async (banner) => {
    try {
      const res = await axiosPublic.patch(`/banners/${banner._id}`, {
        isSelected: !banner.isSelected,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Banner status updated 🚀", "success");
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ Delete Banner
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Banner?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (confirm.isConfirmed) {
      const res = await axiosPublic.delete(`/banners/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Banner removed ❌", "success");
        refetch();
      }
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading data</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Banners</h1>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table w-full">
          <thead className="text-gray-400">
            <tr>
              <th>#</th>
              <th>Banner</th>
              <th>Title</th>
              <th>Discount</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {banners.map((banner, index) => (
              <tr key={banner._id} className="hover">
                {/* Index */}
                <td>{index + 1}</td>

                {/* Image */}
                <td>
                  <img
                    src={banner.image}
                    alt=""
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>

                {/* Title */}
                <td className="font-semibold">{banner.title}</td>

                {/* Discount */}
                <td>{banner.discount}</td>

                {/* Status */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      banner.isSelected
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {banner.isSelected ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex gap-2 justify-center items-center pt-5">
                  <button
                    onClick={() => handleToggle(banner)}
                    className={`px-4 py-1 rounded text-white ${
                      banner.isSelected
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {banner.isSelected ? "Remove" : "Set"}
                  </button>

                  <button
                    onClick={() => handleDelete(banner._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBanner;