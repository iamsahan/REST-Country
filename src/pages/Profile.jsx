import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CreatePostModal from "../components/CreatePostModal";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  console.log(user);
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Please login first.</p>
      </div>
    );
  }

  return (
    <div className="flex bg-black items-center justify-center min-h-screen px-4">
      <div className="bg-gray-50 p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <div className="flex flex-col items-center">
          {user.profilePicUrl ? (
            <img
              src={user.user.profilePicUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-blue-200 text-4xl flex items-center justify-center text-white font-bold mb-4">
              {user.user.name ? user.user.name.charAt(0) : "?"}
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-800">{user.user.name}</h2>
          <p className="text-gray-600">{user.user.email}</p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition"
          >
            Create Post
          </button>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
      {showModal && (
        <CreatePostModal
          onClose={() => setShowModal(false)}
          userId={user.user._id}
        />
      )}
    </div>
  );
};

export default Profile;
