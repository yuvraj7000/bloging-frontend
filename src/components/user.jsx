
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Star } from 'lucide-react'


const UserProfile = ({ isLoggedIn = true }) => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('created');

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

  const handleEditBlog = (blogId) => {
    console.log("Edit blog", blogId);
  };

  const handleDeleteBlog = async(blogId) => {
    console.log("Delete blog", blogId);
    const response = await axios.post(`http://localhost:3002/api/v1/blog/delete_blog`,{ "blog_id" : blogId}, { withCredentials: true });
    if (response.status === 200) {
      console.log("Blog deleted successfully");
    }
    else {
      console.error('Error deleting blog:', error);
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
                  <DropdownMenuItem onClick={() => handleEditBlog(blog._id)}>
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteBlog(blog._id)}>
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
                  <DropdownMenuItem onClick={() => handleEditBlog(blog._id)}>
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
    return <div className="text-center py-8">Loading...</div>;
  }
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
    </div>
    <div className="ml-auto flex gap-2">
      <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 mb-3" onClick={() => console.log("Edit Profile")}>
        Edit
      </Button>
      <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 mb-3" onClick={logout}>
        Logout
      </Button>
    </div>
  </div>
</div>


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
          {userData.blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} showOptions={isLoggedIn} />

          ))}
        </TabsContent>
        {isLoggedIn && (
          <TabsContent value="starred">
            {userData.stars.length > 0 ? (
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



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MoreHorizontal, Star } from 'lucide-react'

// const UserProfile = ({ isLoggedIn = true }) => {
//   const [userData, setUserData] = useState(null);
//   const [activeTab, setActiveTab] = useState('created');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3002/api/v1/user/myProfile', { withCredentials: true });
//         if (response.status === 200) {
//           setUserData(response.data.user);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleCreateBlog = () => {
//     // Implement blog creation logic
//     console.log("Create new blog");
//   };

//   const handleEditBlog = (blogId) => {
//     // Implement blog editing logic
//     console.log("Edit blog", blogId);
//   };

//   const handleDeleteBlog = (blogId) => {
//     // Implement blog deletion logic
//     console.log("Delete blog", blogId);
//   };

//   const BlogCard = ({ blog, showOptions = true }) => (
//     <Card className="mb-4 shadow-sm border border-gray-100">
//       <CardContent className="p-4">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h3>
//             <p className="text-gray-600 mb-2">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
//             <p className="text-gray-700">{blog.blog_content.substring(0, 100)}...</p>
//             <Badge className="mt-2">{blog.category}</Badge>
//           </div>
//           {showOptions && (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="h-8 w-8 p-0">
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem onClick={() => handleEditBlog(blog._id)}>
//                   <span>Edit</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => handleDeleteBlog(blog._id)}>
//                   <span>Delete</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );

//   if (!userData) {
//     return <div className="text-center py-8">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 bg-white max-w-screen-lg">
//       <Card className="mb-8 shadow-sm border border-gray-100">
//         <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-6">
//           <Avatar className="w-32 h-32 border-2 border-blue-100">
//             <AvatarImage src={userData.user_img} alt={userData.fullname} />
//             <AvatarFallback>{userData.fullname.charAt(0)}</AvatarFallback>
//           </Avatar>
//           <div className="text-center md:text-left flex-grow">
//             <h1 className="text-3xl font-bold mb-2 text-gray-800">{userData.fullname}</h1>
//             <p className="text-gray-600 mb-1">@{userData.username}</p>
//             <p className="text-gray-600 mb-4">{userData.email}</p>
//             <p className="mb-4 max-w-2xl text-gray-700">{userData.description}</p>
//             {userData.social && userData.social.length > 0 && (
//               <div className="flex justify-center md:justify-start space-x-4 mb-4">
//                 {userData.social.map((link, index) => (
//                   <a key={index} href={link.social_link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
//                     {link.social_name}
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>
//           {!isLoggedIn && (
//             <div className="flex flex-col space-y-2">
//               <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
//               <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">Create Account</Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <div className="mb-6 flex justify-between items-center">
//         <h2 className="text-2xl font-semibold text-gray-800">Blogs</h2>
//         {isLoggedIn && (
//           <Button onClick={handleCreateBlog} className="bg-green-600 hover:bg-green-700">
//             Create New Blog
//           </Button>
//         )}
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="mb-4 bg-gray-100">
//           <TabsTrigger value="created" className="data-[state=active]:bg-white text-blue-800">Created Blogs</TabsTrigger>
//           {isLoggedIn && (
//             <TabsTrigger value="starred" className="data-[state=active]:bg-white text-blue-800">Starred Blogs</TabsTrigger>
//           )}
//         </TabsList>
//         <TabsContent value="created">
//           {userData.blogs.map(blog => (
//             <BlogCard key={blog._id} blog={blog} showOptions={isLoggedIn} />
//           ))}
//         </TabsContent>
//         {isLoggedIn && (
//           <TabsContent value="starred">
//             {userData.stars.length > 0 ? (
//               <div className="text-center py-4">
//                 <Star className="mx-auto h-12 w-12 text-yellow-400 mb-2" />
//                 <p className="text-gray-600">You have {userData.stars.length} starred blog(s)</p>
//                 <p className="text-sm text-gray-500">Detailed information not available in the current data structure.</p>
//               </div>
//             ) : (
//               <p className="text-center py-4 text-gray-600">You haven't starred any blogs yet.</p>
//             )}
//           </TabsContent>
//         )}
//       </Tabs>
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // Import your UI components here...

// const UserProfile = ({ isLoggedIn = true }) => {
//   const [userData, setUserData] = useState(null); // Set initial state as null
//   const [activeTab, setActiveTab] = useState('created');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3002/api/v1/user/myProfile', { withCredentials: true });
//         if (response.status === 200) {
//           setUserData(response.data.user); // Set user data from API response
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleCreateBlog = () => {
//     // Logic to handle creating a new blog
//   };

//   return (
//     userData ? (
//       <div className="container mx-auto px-4 py-8 bg-white max-w-screen-lg">
//         <Card className="mb-8 shadow-sm border border-gray-100">
//           <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-6">
//             <Avatar className="w-32 h-32 border-2 border-blue-100">
//               <AvatarImage src={userData.user_img} alt={userData.fullname} />
//               <AvatarFallback>{userData.fullname.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div className="text-center md:text-left flex-grow">
//               <h1 className="text-3xl font-bold mb-2 text-gray-800">{userData.fullname}</h1>
//               <p className="text-gray-600 mb-1">@{userData.username}</p>
//               <p className="text-gray-600 mb-4">{userData.email}</p>
//               <p className="mb-4 max-w-2xl text-gray-700">{userData.description}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="mb-6 flex justify-between items-center">
//           <h2 className="text-2xl font-semibold text-gray-800">Blogs</h2>
//           {isLoggedIn && (
//             <Button onClick={handleCreateBlog} className="bg-green-600 hover:bg-green-700">
//               Create New Blog
//             </Button>
//           )}
//         </div>

//         <Tabs value={activeTab} onValueChange={setActiveTab}>
//           <TabsList className="mb-4 bg-gray-100">
//             <TabsTrigger value="created" className="data-[state=active]:bg-white text-blue-800">Created Blogs</TabsTrigger>
//           </TabsList>
//           <TabsContent value="created">
//             {userData.blogs.map(blog => (
//               <BlogCard key={blog._id} blog={{
//                 title: blog.title,
//                 date: new Date(blog.createdAt).toLocaleDateString(),
//                 excerpt: blog.blog_content.slice(0, 100) + '...',
//               }} showOptions={isLoggedIn} />
//             ))}
//           </TabsContent>
//         </Tabs>
//       </div>
//     ) : (
//       <p>Loading...</p>
//     )
//   );
// };

// export default UserProfile;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserProfile = ({ isLoggedIn = true }) => {
//   const [userData, setUserData] = useState(null); // Set initial state as null
//   const [activeTab, setActiveTab] = useState('created');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3002/api/v1/user/myProfile', { withCredentials: true });
//         if (response.status === 200) {
//           setUserData(response.data.user); // Set user data from API response
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleCreateBlog = () => {
//     // Logic to handle creating a new blog
//   };

//   return (
//     userData ? (
// <>
// <div>{userData.username}</div>
// </>

//     ) : (
//       <p>Loading...</p>
//     )
//   );
// };

// export default UserProfile;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Camera, Star, Edit3 } from 'lucide-react';

// const UserProfile = ({ isLoggedIn = true }) => {
//   const [userData, setUserData] = useState(null);
//   const [activeTab, setActiveTab] = useState('created');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3002/api/v1/user/myProfile', { withCredentials: true });
//         if (response.status === 200) {
//           setUserData(response.data.user);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleCreateBlog = () => {
//     // Logic to handle creating a new blog
//   };

//   if (!userData) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-xl font-semibold">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="relative h-48 bg-blue-500">
//           <img
//             src={userData.user_img}
//             alt={userData.fullname}
//             className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 rounded-full border-4 border-white object-cover"
//           />
//         </div>
//         <div className="pt-16 pb-8 text-center">
//           <h1 className="text-2xl font-bold">{userData.fullname}</h1>
//           <p className="text-gray-600">@{userData.username}</p>
//           <p className="mt-2 text-gray-700">{userData.description}</p>
//           <div className="mt-4 flex justify-center space-x-4">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 flex items-center">
//               <Edit3 className="w-4 h-4 mr-2" />
//               Edit Profile
//             </button>
//             <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center" onClick={handleCreateBlog}>
//               <Camera className="w-4 h-4 mr-2" />
//               Create Blog
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mt-8">
//         <div className="flex border-b">
//           <button
//             className={`flex-1 py-2 text-center ${activeTab === 'created' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
//             onClick={() => setActiveTab('created')}
//           >
//             Created Blogs ({userData.blogs.length})
//           </button>
//           <button
//             className={`flex-1 py-2 text-center ${activeTab === 'starred' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
//             onClick={() => setActiveTab('starred')}
//           >
//             Starred Blogs ({userData.stars.length})
//           </button>
//         </div>

//         <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {activeTab === 'created' && userData.blogs.map((blog) => (
//             <div key={blog._id} className="bg-white shadow-md rounded-lg overflow-hidden">
//               <img src={blog.blog_img} alt={blog.title} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
//                 <p className="text-gray-600 text-sm mb-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
//                 <p className="text-gray-700 line-clamp-3">{blog.blog_content}</p>
//               </div>
//             </div>
//           ))}
//           {activeTab === 'starred' && (
//             <p className="col-span-full text-center text-gray-600">Starred blogs information not available in the current data structure.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;