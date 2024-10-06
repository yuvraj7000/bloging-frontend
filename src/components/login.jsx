import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '', // This will hold either the username or email
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Handle login logic here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded-md shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Login</h2>

      <input
        type="text"
        name="identifier"
        placeholder="Username or Email"
        value={formData.identifier}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Log In
      </button>

      <div className="text-center">
        <p className="text-gray-600">Don't have an account?</p>
        <button
          type="button"
          onClick={() => window.location.href = '/register'} // Adjust this link based on your routing setup
          className="text-blue-600 underline mt-2"
        >
          Create New Account
        </button>
      </div>
    </form>
  );
};

export default Login;
