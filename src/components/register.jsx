import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    userImg: null,
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, userImg: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('fullname', formData.fullname);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('user_img', formData.userImg);

    try {
      const response = await axios.post('http://localhost:3002/api/v1/user/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        toast.success('Registration successful!');
        setRegistrationSuccess(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error(error.response?.data?.message || 'Error registering user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md space-y-4 m-10">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-800">Register</h2>

      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        value={formData.fullname}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        disabled={registrationSuccess}
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        disabled={registrationSuccess}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        disabled={registrationSuccess}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        disabled={registrationSuccess}
      />

      <input
        type="file"
        name="userImg"
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300 rounded"
        disabled={registrationSuccess}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        disabled={registrationSuccess}
      ></textarea>

      {!registrationSuccess ? (
        <button
          type="submit"
          className={`w-full p-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      ) : (
        <Link to='/login'>
        <button
          type="button"
          className="w-full p-2 text-white rounded-md bg-green-600 hover:bg-green-700"
       
        >
          Go to Login
        </button>
        </Link>
      )}
    </form>
  );
};

export default Register;