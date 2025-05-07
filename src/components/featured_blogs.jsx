import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import mn from './img/mn.png';
import kb from './img/kisanBandhu.png';
import ht from './img/hackathon.png';
import bw from './img/blogwave.png';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: "6818d4557f3b1c5a03935dcd",
    title: "🗃️ Behind BlogWave: My Database Design Journey",
    excerpt: "I hope this gives you insight into the engine that powers this platform.",
    imageUrl: bw,
  },
  {
    id: "681ad0827f3b1c5a03935ebe",
    title: "Kisan Bandhu – My App, A Farmer’s True Friend 🌾📱",
    excerpt: "A comprehensive guide to the features and benefits of the Kisan Bandhu app.",
    imageUrl: kb,
  },
  {
    id: "6744026aa59bfe438724f0f5",
    title: "Hackathon Experience! 💻🚀 [HACKINDORE]",
    excerpt: "Participating with my amazing team, Code Crusaders.",
    imageUrl: ht,
  },
];

const FeaturedBlogs = () => {
  return (
    <section className="py-12 bg-gray-800 text-white">
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
                <p className="text-gray-400">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Link to={`/blog/${post.id}`}>
              <Button variant="outline" className="text-white border-white hover:bg-blue-600 hover:text-white transition-colors duration-300">
  Read More
</Button>
</Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;