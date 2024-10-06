import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    userImg: null,
    description: '',
    socialLinks: [{ platform: '', url: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialLinkChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSocialLinks = formData.socialLinks.map((link, i) =>
      i === index ? { ...link, [name]: value } : link
    );
    setFormData({ ...formData, socialLinks: updatedSocialLinks });
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: '', url: '' }],
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, userImg: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Register</h2>

      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        value={formData.fullname}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="file"
        name="userImg"
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      ></textarea>

      <div className="space-y-2">
        {formData.socialLinks.map((link, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="platform"
              placeholder="Platform"
              value={link.platform}
              onChange={(e) => handleSocialLinkChange(index, e)}
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="url"
              name="url"
              placeholder="URL"
              value={link.url}
              onChange={(e) => handleSocialLinkChange(index, e)}
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSocialLink}
          className="text-blue-600 underline"
        >
          Add another social link
        </button>
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
