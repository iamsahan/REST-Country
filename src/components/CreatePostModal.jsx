import axios from "axios";
import React, { useState } from "react";

const CreatePostModal = ({ onClose, userId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      image,
      author: userId,
    };

    try {
      const response = await axios.post(
        "http://localhost:8090/api/blogs/",
        payload,
        { withCredentials: true }
      );

      if (response.ok) {
        alert("Post created successfully!");
        onClose();
      } else {
        alert("Failed to create post.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Create New Blog Post
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            placeholder="Content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 h-32 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
          ></textarea>
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
          />
          <button
            type="submit"
            className="bg-violet-600 text-white py-2 px-6 rounded-lg hover:bg-violet-700 w-full"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
