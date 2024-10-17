
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('blog_content', content);
    formData.append('blog_img', image);
    formData.append('category', category);

    try {
      const response = await axios.post('http://localhost:3002/api/v1/blog/create_blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success('Blog created successfully');
        // Clear form fields after submission
        setTitle('');
        setImage(null);
        setContent('');
        setCategory('');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Error creating blog');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            accept="image/*"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="bg-white text-black"
            placeholder="Write your blog content here..."
            theme="snow"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            placeholder="Enter blog category"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;