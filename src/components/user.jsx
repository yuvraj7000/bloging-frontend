
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

const UserProfile = ({ isLoggedIn = true }) => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('created');
  const [showAddLinkForm, setShowAddLinkForm] = useState(false);
  const [newLink, setNewLink] = useState({ platform: '', url: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/v1/user/myProfile', { withCredentials: true });
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
      const response = await axios.post('http://localhost:3002/api/v1/user/addSocial', {
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
      const response = await axios.get('http://localhost:3002/api/v1/user/logout', { withCredentials: true });
      if (response.status === 200) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error logging out:')
    }
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