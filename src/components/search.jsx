import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import mn from './img/mn.png';
// Sample data - replace with actual data from your API or database
const sampleBlogs = [
  { id: 1, title: "React Hooks Explained", category: "Programming", author: "Jane Doe" , image: mn },
  { id: 2, title: "10 Healthy Breakfast Ideas", category: "Health", author: "John Smith", image: mn },
  { id: 3, title: "Introduction to Machine Learning", category: "Technology", author: "Alice Johnson", image: mn },
  { id: 4, title: "Tips for Effective Time Management", category: "Productivity", author: "Bob Williams", image: mn },
  { id: 5, title: "The Art of Landscape Photography", category: "Photography", author: "Emma Brown", image: mn },
];

const categories = ["All", "Programming", "Health", "Technology", "Productivity", "Photography"];

const BlogSearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchResults, setSearchResults] = useState(sampleBlogs);

  useEffect(() => {
    const filteredResults = sampleBlogs.filter(blog => 
      (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       blog.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || blog.category === selectedCategory)
    );
    setSearchResults(filteredResults);
  }, [searchTerm, selectedCategory]);

  return (
    <section className="py-12 bg-white ">
      <div className="container mx-auto px-4 w-screen max-w-screen-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Search Blogs</h2>
        
        <div className="mb-6 bg-gray-50 p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search blogs by title or author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-gray-300 animate-blink p-2 rounded-md text-gray-800"
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
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {searchResults.map(blog => (
    <Card key={blog.id} className="bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-t-lg" />
        <h3 className="text-xl font-semibold text-white mt-2">{blog.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">By {blog.author}</p>
        <Badge className="mt-1 bg-blue-100 text-blue-800">{blog.category}</Badge>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" className="text-blue-600 hover:bg-blue-50 px-4 py-1">
          Read More
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>


        {searchResults.length === 0 && (
          <p className="text-center text-gray-600 mt-6">No results found. Try a different search term or category.</p>
        )}
      </div>
    </section>
  );
};

export default BlogSearchSection;