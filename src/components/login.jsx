// // import React, { useState, useContext } from 'react';
// // import axios from 'axios';
// // import useLogin from './useLogin'; 

// // const Login = () => {
// //   const [user_value, user_setValue] = useLogin();
// //   const [formData, setFormData] = useState({
// //     identifier: '', // This will hold either the username or email
// //     password: '',
// //   });
// //   const [errorMessage, setErrorMessage] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
 

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://localhost:3002/api/v1/user/login', {
// //         username: formData.identifier,
// //         password: formData.password,
// //       }, { withCredentials: true });
// //       if (response.status === 200) {
// //         setSuccessMessage('Login successful!');
// //         setErrorMessage('');
// //         setIsLoggedIn(true);
// //         setUser(response.data);
// //         console.log("response -> ",response.data)
// //         console.log("response.data -> ",response.data) // Store user information in context
// //         console.log('Response cookies:', document.cookie);
// //         // window.location.href = '/myProfile'; // Redirect to profile page
// //       }
// //     } catch (error) {
// //       if (error.response && error.response.status === 400) {
// //         setErrorMessage(error.response.data.message);
// //         setSuccessMessage('');
// //       } else {
// //         console.error('API error:', error);
// //       }
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded-md shadow-md space-y-4">
// //       <h2 className="text-2xl font-bold text-gray-800">Login</h2>

// //       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
// //       {successMessage && <p className="text-green-500">{successMessage}</p>}

// //       <input
// //         type="text"
// //         name="identifier"
// //         placeholder="Username or Email"
// //         value={formData.identifier}
// //         onChange={handleChange}
// //         className="w-full p-2 border border-gray-300 rounded"
// //         required
// //       />

// //       <input
// //         type="password"
// //         name="password"
// //         placeholder="Password"
// //         value={formData.password}
// //         onChange={handleChange}
// //         className="w-full p-2 border border-gray-300 rounded"
// //         required
// //       />

// //       <button
// //         type="submit"
// //         className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
// //       >
// //         Log In
// //       </button>

// //       <div className="text-center">
// //         {isLoggedIn ? (
// //           <button
// //             type="button"
// //             onClick={() => window.location.href = '/myProfile'}
// //             className="text-blue-600 underline mt-2"
// //           >
// //             Go to Profile
// //           </button>
// //         ) : (
// //           <>
// //             <p className="text-gray-600">Don't have an account?</p>
// //             <button
// //               type="button"
// //               onClick={() => window.location.href = '/register'} // Adjust this link based on your routing setup
// //               className="text-blue-600 underline mt-2"
// //             >
// //               Create New Account
// //             </button>
// //           </>
// //         )}
// //       </div>
// //     </form>
// //   );
// // };

// // export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import useLogin from './useLogin'; // Import the custom hook

// const Login = () => {
//   const [user_value, user_setValue] = useLogin(); // Use the custom hook
//   const [formData, setFormData] = useState({
//     identifier: '', // This will hold either the username or email
//     password: '',
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3002/api/v1/user/login', {
//         username: formData.identifier,
//         password: formData.password,
//       }, { withCredentials: true });
//       if (response.status === 200) {
//         console.log("val -> ",user_value)
//         setSuccessMessage('Login successful!');
//         setErrorMessage('');
//         setIsLoggedIn(true);
//         user_setValue(true); // Update the login state
//         console.log("response -> ", response.data);
//         console.log("response.data -> ", response.data); // Store user information in context
//         console.log('Response cookies:', document.cookie);
//         // window.location.href = '/myProfile'; // Redirect to profile page
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setErrorMessage(error.response.data.message);
//         setSuccessMessage('');
//       } else {
//         console.error('API error:', error);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded-md shadow-md space-y-4">
//       <h2 className="text-2xl font-bold text-gray-800">Login</h2>

//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       {successMessage && <p className="text-green-500">{successMessage}</p>}

//       <input
//         type="text"
//         name="identifier"
//         placeholder="Username or Email"
//         value={formData.identifier}
//         onChange={handleChange}
//         className="w-full p-2 border border-gray-300 rounded"
//         required
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         className="w-full p-2 border border-gray-300 rounded"
//         required
//       />

//       <button
//         type="submit"
//         className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//       >
//         Log In
//       </button>

//       <div className="text-center">
//         {isLoggedIn ? (
//           <button
//             type="button"
//             onClick={() => window.location.href = '/myProfile'}
//             className="text-blue-600 underline mt-2"
//           >
//             Go to Profile
//           </button>
//         ) : (
//           <>
//             <p className="text-gray-600">Don't have an account?</p>
//             <button
//               type="button"
//               onClick={() => window.location.href = '/register'} // Adjust this link based on your routing setup
//               className="text-blue-600 underline mt-2"
//             >
//               Create New Account
//             </button>
//           </>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
 
  const [formData, setFormData] = useState({
    identifier: '', // This will hold either the username or email
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/api/v1/user/login', {
        username: formData.identifier,
        password: formData.password,
      }, { withCredentials: true });
      if (response.status === 200) {
        setSuccessMessage('Login successful!');
        setErrorMessage('');
        setIsLoggedIn(true);
        // Update the login state
        console.log("response -> ", response.data);
        console.log("response.data -> ", response.data); // Store user information in context
        console.log('Response cookies:', document.cookie);
        // window.location.href = '/myProfile'; // Redirect to profile page
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
        setSuccessMessage('');
      } else {
        console.error('API error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded-md shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Login</h2>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

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
        {isLoggedIn ? (
          <button
            type="button"
            onClick={() => window.location.href = '/myProfile'}
            className="text-blue-600 underline mt-2"
          >
            Go to Profile
          </button>
        ) : (
          <>
            <p className="text-gray-600">Don't have an account?</p>
            <button
              type="button"
              onClick={() => window.location.href = '/register'} // Adjust this link based on your routing setup
              className="text-blue-600 underline mt-2"
            >
              Create New Account
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default Login;