import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import mn from './img/mn.png';


const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Productive Remote Work",
    excerpt: "Learn how to stay focused and efficient while working from home.",
    imageUrl: mn,
  },
  {
    id: 2,
    title: "The Future of Artificial Intelligence",
    excerpt: "Exploring the potential impacts of AI on various industries.",
    imageUrl: mn,
  },
  {
    id: 3,
    title: "Healthy Eating Habits for Busy Professionals",
    excerpt: "Quick and nutritious meal ideas for your workweek.",
    imageUrl: mn,
  },
];

const FeaturedBlogs = () => {
  return (
    <section className="py-12 bg-gray-800">
      <div className="container mx-auto px-4  max-w-screen-lg">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;