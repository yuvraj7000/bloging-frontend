import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react'

// Sample user data - replace with actual data from your API or database
const userData = {
  name: "Jane Doe",
  username: "janedoe",
  email: "jane.doe@example.com",
  avatar: "/api/placeholder/150/150",
  description: "Tech enthusiast, coffee lover, and avid blogger. Sharing my thoughts on the latest in web development and AI.",
  socialMedia: {
    facebook: "https://facebook.com/janedoe",
    twitter: "https://twitter.com/janedoe",
    instagram: "https://instagram.com/janedoe",
    github: "https://github.com/janedoe"
  },
  createdBlogs: [
    { id: 1, title: "10 Tips for Mastering React Hooks", date: "2024-03-15", excerpt: "Dive into the world of React Hooks and level up your development skills." },
    { id: 2, title: "The Future of AI in Web Development", date: "2024-02-28", excerpt: "Explore how AI is shaping the future of web development and what it means for developers." },
    { id: 3, title: "Building Scalable Node.js Applications", date: "2024-02-10", excerpt: "Learn best practices for creating scalable and maintainable Node.js applications." },
  ],
  savedBlogs: [
    { id: 4, title: "Introduction to GraphQL", date: "2024-03-20", excerpt: "Get started with GraphQL and understand why it's becoming so popular." },
    { id: 5, title: "Mastering CSS Grid Layout", date: "2024-03-05", excerpt: "Deep dive into CSS Grid and learn how to create complex layouts with ease." },
  ]
};

const AdaptiveUserProfile = ({ isLoggedIn = true }) => {
  const [activeTab, setActiveTab] = useState('created');

  const handleCreateBlog = () => {
    // Implement blog creation logic
    console.log("Create new blog");
  };

  const handleEditBlog = (blogId) => {
    // Implement blog editing logic
    console.log("Edit blog", blogId);
  };

  const handleDeleteBlog = (blogId) => {
    // Implement blog deletion logic
    console.log("Delete blog", blogId);
  };

  const BlogCard = ({ blog, showOptions = true }) => (
    <Card className="mb-4 shadow-sm border border-gray-100">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h3>
            <p className="text-gray-600 mb-2">Published on {blog.date}</p>
            <p className="text-gray-700">{blog.excerpt}</p>
          </div>
          {showOptions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEditBlog(blog.id)}>
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteBlog(blog.id)}>
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
  const social = userData.socialMedia
  return (
    <div className="container mx-auto px-4 py-8 bg-white max-w-screen-lg">
      <Card className="mb-8 shadow-sm border border-gray-100">
        <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-6">
          <Avatar className="w-32 h-32 border-2 border-blue-100">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{userData.name}</h1>
            <p className="text-gray-600 mb-1">@{userData.username}</p>
            <p className="text-gray-600 mb-4">{userData.email}</p>
            <p className="mb-4 max-w-2xl text-gray-700">{userData.description}</p>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a href={userData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600">FB</a>
              <a href={userData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">TW</a>
              <a href={userData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600">IG</a>
              <a href={userData.socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-gray-800">GH</a>
        
            </div>
        
          </div>
          {!isLoggedIn && (
            <div className="flex flex-col space-y-2">
              <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
              <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">Create Account</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Blogs</h2>
        {isLoggedIn && (
          <Button onClick={handleCreateBlog} className="bg-green-600 hover:bg-green-700">
            Create New Blog
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 bg-gray-100">
          <TabsTrigger value="created" className="data-[state=active]:bg-white text-blue-800">Created Blogs</TabsTrigger>
          {isLoggedIn && (
            <TabsTrigger value="saved" className="data-[state=active]:bg-white text-blue-800">Saved Blogs</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="created">
          {userData.createdBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} showOptions={isLoggedIn} />
          ))}
        </TabsContent>
        {isLoggedIn && (
          <TabsContent value="saved">
            {userData.savedBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AdaptiveUserProfile;