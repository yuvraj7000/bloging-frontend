
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createRoutesFromElements, createBrowserRouter,RouterProvider,Route } from 'react-router-dom'
import Layout from './components/layout'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import UserProfile from './components/user'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='user/:name' element={<UserProfile />} />
      <Route path='myProfile' element={<UserProfile />} />
      
      {/* <Route path='contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
      <Route 
      loader={githubInfoLoader}
      path='github' 
      element={<Github />}
       /> */}
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)