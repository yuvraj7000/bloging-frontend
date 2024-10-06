// src/App.jsx
import React from 'react';
import LandingPage from './components/landingPage';
import Navbar from './components/nav';
import './App.css';
import Hero from './components/hero';
import FeaturedBlogs from './components/featured_blogs';
import BlogSearchSection from './components/search';
import Footer from './components/footer';
import UserProfilePage from './components/user';
import Register from './components/register';
import Login from './components/login';
import BlogPage from './components/blog';
import CreateBlog from './components/createBlog';
const App = () => {
  return (

    <>

      {/* <LandingPage /> */}
      <Navbar></Navbar>
      {/* <Hero></Hero>
      <FeaturedBlogs></FeaturedBlogs>
      <BlogSearchSection></BlogSearchSection> */}
      {/* <UserProfilePage></UserProfilePage> */}
      {/* <Register></Register> */}
      {/* <Login></Login> */}
      {/* <BlogPage></BlogPage> */}
      <CreateBlog></CreateBlog>
      <Footer></Footer>
    </>

  );
};

export default App;
