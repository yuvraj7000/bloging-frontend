import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('content', content);

    // Log for demonstration; replace this with your actual submission logic
    console.log('Blog Submitted:', {
      title,
      image: image ? image.name : 'No image selected',
      content,
    });

    // Clear form fields after submission
    setTitle('');
    setImage(null);
    setContent('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
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
