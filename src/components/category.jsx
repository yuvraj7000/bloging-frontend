
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Category = () => {
  const { name } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:3002/api/v1/blog/category_blogs', {
          category: name
        }, { withCredentials: true });

        if (response.status === 200) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [name]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-dvh bg-gray-100">
        <div className="text-center">
          <svg
            className="animate-spin h-15 w-15 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <svg
            className="w-12 h-12 text-red-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{name} Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
   <Card key={blog._id} className="bg-blue-50 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
   <CardHeader className="p-0">
     <img src={blog.blog_img} alt={blog.title} className="w-full h-48 object-cover" />
   </CardHeader>
   <CardContent className="p-4 flex flex-col items-center">
     <h3 className="text-2xl font-semibold text-blue-900 mb-2 text-center">{blog.title}</h3>
     <div className="flex items-center mb-4">
       <Avatar className="h-10 w-10 mr-3">
         <AvatarImage src={blog.created_by.user_img} alt={blog.created_by.username} />
         <AvatarFallback>{blog.created_by.username[0].toUpperCase()}</AvatarFallback>
       </Avatar>
       <p className="text-gray-600"><span className="font-medium text-blue-900">{blog.created_by.username}</span></p>
     </div>
     <Badge className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full mb-4">{blog.category}</Badge>
   </CardContent>
   <CardFooter className="flex justify-center">
     <Link to={`/blog/${blog._id}`}>
       <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full">
         Read More
       </Button>
     </Link>
   </CardFooter>
 </Card>
        ))}
      </div>
    </div>
  );
};

export default Category;