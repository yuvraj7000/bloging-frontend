// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Link, Outlet } from 'react-router-dom'

// const Home = () => <h1>Home Page</h1>
// const About = () => <h1>About Page</h1>
// const Contact = () => <h1>Contact Page</h1>
// const User = ({ params }) => <h1>User Page {params.userid}</h1>
// const Layout = () => (
//   <div>
//     <nav>
//       <ul>
//         <li>
//           <Link to='/'>Home</Link>
//         </li>
//         <li>
//           <Link to='/about'>About</Link>
//         </li>
//         <li>
//           <Link to='/contact'>Contact</Link>
//         </li>
//         <li>
//           <Link to='/user/123'>User 123</Link>
//         </li>
//       </ul>
//     </nav>
//     <Outlet />
//   </div>
// )

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//       <Route path='' element={<Home />} />
//       <Route path='about' element={<About />} />
//       <Route path='contact' element={<Contact />} />
//       <Route path='user/:userid' element={<User />} />
//     </Route>
//   )
// )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)