import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/blogs/");
      setPosts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen pt-40 p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6 text-violet-700">
        All Blog Posts
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-xl font-semibold text-violet-800">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {post.content}
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Author: {post.author?.name || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
