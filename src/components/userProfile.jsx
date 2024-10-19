
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';


const Profile = ({ isLoggedIn = true }) => {
  const { name } = useParams();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('created');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/user/userProfile`, {
          username: name
        }, { withCredentials: true });
        if (response.status === 200) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [name]);

  const handleStarBlog = async (blogId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/blog/star_blog`, { "blog_id": blogId }, { withCredentials: true });
      if (response.status === 200) {
        console.log("Blog starred successfully");
      }
    } catch (error) {
      console.error('Error starring blog:', error);
    }
  };

  const BlogCard = ({ blog, showOptions = true }) => (
    <div className="mb-4 shadow-sm border border-gray-100">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className='flex '>
            <img src={blog.blog_img || "ll"} alt={blog.title} className="w-32 h-32 object-cover rounded-lg mb-4 mr-6" />
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                <Link 
                  to={`/blog/${blog._id}`} 
                  className="hover:underline hover:text-blue-600"
                >
                  {blog.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-2">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-700">{blog.blog_content.substring(0, 100)}...</p>
              <span className="mt-2 inline-block bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs font-semibold">{blog.category}</span>
            </div>
          </div>
          {showOptions && (
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleStarBlog(blog._id)}>
                    <span>star</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
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
          <p className="text-gray-600 text-lg">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white max-w-screen-lg">
      <div className="mb-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-6 px-6">
          <Avatar className="w-32 h-32 border-2 border-blue-100">
            <AvatarImage src={userData.user_img} alt={userData.fullname} />
            <AvatarFallback>{userData.fullname.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{userData.fullname}</h1>
            <p className="text-gray-600 mb-1">@{userData.username}</p>
            <p className="text-gray-600 mb-4">{userData.email}</p>
            <p className="mb-4 max-w-2xl text-gray-700">{userData.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {userData.social.map((social, index) => (
                <a key={index} href={social.social_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline m-3 ml-0">
                  {social.social_name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Blogs</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 bg-gray-100">
          <TabsTrigger value="created" className="data-[state=active]:bg-white text-blue-800">Created Blogs</TabsTrigger>
        </TabsList>
        <TabsContent value="created">
          {userData.blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} showOptions={isLoggedIn} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;