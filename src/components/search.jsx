
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const categories = ["Latest", "mn", "education", "Technology", "Productivity", "Photography"];

const BlogSearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Latest');
  const [searchResults, setSearchResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError('');

        let response;
        if (searchTerm) {
          response = await axios.post('http://localhost:3002/api/v1/blog/search', {
            search: searchTerm
          }, { withCredentials: true });
        } else if (selectedCategory === 'Latest') {
          response = await axios.get('http://localhost:3002/api/v1/blog/latest_blogs', { withCredentials: true });
        } else {
          response = await axios.post('http://localhost:3002/api/v1/blog/category_blogs', {
            category: selectedCategory
          }, { withCredentials: true });
        }

        if (response.status === 200) {
          setSearchResults(response.data.blogs);
          setUsers(response.data.users || []);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory, searchTerm]);

  return (
    <section id="search" className="py-12 bg-white">
      <div className="container mx-auto px-4 w-screen max-w-screen-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Search Blogs</h2>
        
        <div className="mb-6 bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search blogs by title or author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-gray-300 p-2 rounded-md text-gray-800"
            />
            <button
              onClick={() => setSearchTerm(searchTerm)}
              className="ml-2 bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md"
            >
              Search
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() =>{ setSelectedCategory(category); setSearchTerm('')}}
                className={selectedCategory === category ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
           <div className="flex justify-center items-center p-20 bg-gray-100">
           <div className="text-center">
             <svg
               className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
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
        ) : error ? (
          <div className="flex justify-center items-center p-10 bg-gray-100">
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
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <Card key={user._id} className="bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Link to={`/profile/${user.username}`}>
                  <CardHeader className="flex items-center just">
                    <img src={user.user_img} alt={user.username} className="w-12 h-12 object-cover rounded-full" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{user.username}</h3>
                      {/* <p className="text-gray-400">{user.fullname}</p> */}
                    </div>
                  </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {searchResults.map(blog => (
            <Card key={blog._id} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
            <CardHeader className="p-0">
              <img src={blog.blog_img} alt={blog.title} className="w-full h-48 object-cover" />
            </CardHeader>
            <CardContent className="p-4 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
              <p className="text-gray-600 mb-2">writter : <span className="font-medium text-gray-800">{blog.created_by.username}</span></p>
              <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{blog.category}</Badge>
            </CardContent>
            <CardFooter className="p-4 flex justify-center">
              <Link to={`/blog/${blog._id}`}>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full">
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
              ))}
            </div>
          </>
        )}

        {searchResults.length === 0 && users.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600 mt-6">No results found. Try a different search term or category.</p>
        )}
      </div>
    </section>
  );
};

export default BlogSearchSection;