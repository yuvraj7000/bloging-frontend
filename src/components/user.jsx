
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Star } from 'lucide-react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const UserProfile = ({ isLoggedIn = true }) => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('created');
  const [showAddLinkForm, setShowAddLinkForm] = useState(false);
  const [newLink, setNewLink] = useState({ platform: '', url: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/user/myProfile`, { withCredentials: true });
        if (response.status === 200) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateBlog = () => {
    console.log("Create new blog");
  };

  const handleAddLink = () => {
    setShowAddLinkForm(!showAddLinkForm);
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setNewLink({ ...newLink, [name]: value });
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/user/addSocial`, {
        social_name: newLink.platform,
        social_link: newLink.url
      }, { withCredentials: true });


      if (response.status === 200) {
        // Ensure userData and userData.social are defined
        if (userData && userData.social) {
          // Add the new link to the user's social links
          setUserData({
            ...userData,
            social: [...userData.social, { social_name: newLink.platform, social_link: newLink.url }]
          });
          setNewLink({ platform: '', url: '' });
          setShowAddLinkForm(false);
          toast.success('Link added successfully!');
        } else {
          toast.error('User data is not available');
        }
      } else {
        toast.error('Failed to add link');
      }



    } catch (error) {
      console.error('Error adding link:', error);
      toast.error('Error adding link');
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/user/logout`, { withCredentials: true });
      if (response.status === 200) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error logging out:')
    }
  }

const handleRemoveBlog = async(blogId) => {
  console.log("remove blog -> ", blogId);
  try {
    const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/blog/unstar_blog`,{ "blog_id" : blogId}, { withCredentials: true });
    if (response.status === 200) {
      setUserData(prevData => ({
        ...prevData,
        stars: prevData.stars.filter(blog => blog._id !== blogId)
      }));
      toast.success("Blog removed successfully");
    }
  } catch (error) {
    console.error('Error unstarring blog:', error);
    toast.error('Error unstarring blog');
  }
};

const handleDeleteBlog = async(blogId) => {
  console.log("Delete blog", blogId);
  try {
    const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/blog/delete_blog`,{ "blog_id" : blogId}, { withCredentials: true });
    if (response.status === 200) {
      setUserData(prevData => ({
        ...prevData,
        blogs: prevData.blogs.filter(blog => blog._id !== blogId)
      }));
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
  }
};

const confirmDeleteBlog = (blogId) => {
  confirmAlert({
    title: 'Confirm to delete',
    message: 'Are you sure you want to delete this blog?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => handleDeleteBlog(blogId)
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
  });
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
                {/* <p className="text-gray-700">{blog.blog_content.substring(0, 10)}...</p> */}
                <span className="mt-2 inline-block bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs font-semibold">{blog.category}</span>
              </div>
            </div>
            {showOptions && (
           <div className="relative bg-white">
           <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="h-8 w-8 p-0">
                 <MoreVertical className="h-4 w-4" />
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent align="end" className="bg-white">
               {/* <DropdownMenuItem onClick={() => handleEditBlog(blog._id)}>
                 <span>Edit</span>
               </DropdownMenuItem> */}
               <DropdownMenuItem onClick={() => confirmDeleteBlog(blog._id)}>
                 <span>Delete</span>
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
         </div>
            )}
          </div>
        </div>
      </div>
    
    );
    const StarBlogCard = ({ blog, showOptions = true }) => (
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
                <p className="text-gray-700">{blog.blog_content.substring(0, 10)}...</p>
                <span className="mt-2 inline-block bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs font-semibold">{blog.category}</span>
              </div>
            </div>
            {showOptions && (
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem onClick={() => handleRemoveBlog(blog._id)}>
                      <span>remove</span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => handleDeleteBlog(blog._id)}>
                    <span>Delete</span>
                  </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    
    );
    
    if (!userData) {
      return <div className="flex justify-center items-center h-screen bg-gray-100">
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
    }




  return (
    <div className="container mx-auto px-4 py-8 bg-white max-w-screen-lg">
      <ToastContainer />
      <div className="mb-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-6 px-6">
          <Avatar className="w-32 h-32 border-2 border-blue-100">
            <AvatarImage src={userData?.user_img} alt={userData?.fullname} />
            <AvatarFallback>{userData?.fullname?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{userData?.fullname}</h1>
            <p className="text-gray-600 mb-1">@{userData?.username}</p>
            <p className="text-gray-600 mb-4">{userData?.email}</p>
            <p className="mb-4 max-w-2xl text-gray-700">{userData?.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {userData?.social.map((social, index) => (
                <a key={index} href={social.social_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline m-3 ml-0">
                  {social.social_name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 mb-3" onClick={logout}>
              Logout
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button  className="text-gray-600 border-gray-600 hover:bg-gray-50 mb-3 p-0">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleAddLink}>
                  Add Link
                </DropdownMenuItem>
                {/* Add more menu items here if needed */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {showAddLinkForm && (
        <div className="mb-8 shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Link</h2>
          <form onSubmit={handleLinkSubmit} className="space-y-4">
            <input
              type="text"
              name="platform"
              placeholder="Platform"
              value={newLink.platform}
              onChange={handleLinkChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="url"
              name="url"
              placeholder="URL"
              value={newLink.url}
              onChange={handleLinkChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </form>
        </div>
      )}

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Blogs</h2>
        {isLoggedIn && (
          <Link to="/createBlog">
            <Button onClick={handleCreateBlog} className="bg-green-600 hover:bg-green-700">
              Create New Blog
            </Button>
          </Link>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 bg-gray-100">
          <TabsTrigger value="created" className="data-[state=active]:bg-white text-blue-800">Created Blogs</TabsTrigger>
          {isLoggedIn && (
            <TabsTrigger value="starred" className="data-[state=active]:bg-white text-blue-800">Starred Blogs</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="created">
          {userData?.blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} showOptions={isLoggedIn} />
          ))}
        </TabsContent>
        {isLoggedIn && (
          <TabsContent value="starred">
            {userData?.stars.length > 0 ? (
              userData.stars.map(blog => (
                <StarBlogCard key={blog._id} blog={blog} showOptions={isLoggedIn} />
              ))
            ) : (
              <p className="text-center py-4 text-gray-600">You haven't starred any blogs yet.</p>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default UserProfile;
