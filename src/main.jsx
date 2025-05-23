import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import UserProfile from './components/user';
import BlogPage from './components/blog';
import CreateBlog from './components/createBlog';
import BlogSearchSection from './components/search';
import Category from './components/category';
import Profile from './components/userProfile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='user/:name' element={<UserProfile />} />
      <Route path='blog/:id' element={<BlogPage />} />
      <Route path='myProfile' element={<UserProfile />} />
      <Route path='createBlog' element={<CreateBlog/>} />
      <Route path='search' element={<BlogSearchSection/>} />
      <Route path='category/:name' element={<Category/>} />
      <Route path='profile/:name' element={<Profile/>} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>

      <RouterProvider router={router} />

  </StrictMode>
);
