import Hero from "./hero";
import FeaturedBlogs from "./featured_blogs";
import BlogSearchSection from "./search";

const Home = () => {
    return (
       <>
        <Hero />
        <FeaturedBlogs />
        <BlogSearchSection />
       </> 
    );
}

export default Home;