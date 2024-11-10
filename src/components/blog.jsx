
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const get_blog = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/blog/get_blog`, {
          blogId: id
        }, { withCredentials: true });

        if (response.status === 200) {
          const blogData = response.data.blog;
          console.log(blogData);
          setBlog(blogData);
          setLikes(blogData.likes.length); // Assuming likes is an array
          setComments(blogData.comments);
          console.log('Blog is fetched');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    get_blog();
  }, [id]);

  const handleLike = async() => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/like/add`, {
        blog_id: id,
      }, { withCredentials: true });

      if (response.status === 200) {
        const likes_no = response.data.likes;
        console.log(response.data.message);
        setLikes(likes_no);
        
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('login required');
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      try {
        const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/comment/add_comment`, {
          blog_id: id,
          comment_text: newComment
        }, { withCredentials: true });

        if (response.status === 200) {
          const comment = response.data.comment;
          setComments([...comments, comment]);
          setNewComment('');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
        toast.error('login required');
      }
    }
  };

  const handleReply = async(commentId, replyText) => {
    if (replyText.trim() === '') return;

    const updatedComments = comments.map(comment =>
      comment._id === commentId
        ? { ...comment, reply: [...comment.reply, { _id: comment.reply.length + 1, comment_by: { username: "my reply", user_img: "https://via.placeholder.com/50" }, comment_text: replyText }] }
        : comment
    );
   console.log(replyText);
   console.log("commentId -> ",commentId);
   console.log("Id -> ",id);
   try {
    const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/comment/add_reply`, {
      comment_id : commentId,
      comment_text : replyText
  }, { withCredentials: true });

    if (response.status === 200) {
      console.log('Reply added');
    }
  } catch (error) {
    console.error('Error adding comment:', error);
    toast.error('login required');
  }

    setComments(updatedComments);
  };

  const handleStarBlog = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/blog/star_blog`, {
        blog_id: id,
      }, { withCredentials: true });

      if (response.status === 200) {
        console.log(response.data.message);
        toast.success('Blog starred successfully');
        setShowMenu(false);
      }
    } catch (error) {
      console.error('Error starring blog:', error);
      toast.error('login required');
    }
  };

  if (!blog) {
    return(
    <div className="flex justify-center h-screen items-center p-20 bg-gray-100">
    <div className="text-center">
      <svg
        className="animate-spin h-15 w-15 text-blue-600 mx-auto mb-4"
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
    )
  }
  
 


  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <div className="flex justify-between items-center">
        
     
  <Link to={`/profile/${blog.created_by.username}`}>
    <div className="flex items-center space-x-4 mt-4">
      <img src={blog.created_by.user_img} alt={blog.created_by.username} className="w-10 h-10 rounded-full" />
      <p className="text-gray-600">@{blog.created_by.username}</p>
    </div>
  </Link>

        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-gray-600 focus:outline-none">
            &#x22EE;
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <button
                onClick={handleStarBlog}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Star Blog
              </button>
            </div>
          )}
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
     
      <img src={blog.blog_img} alt="Blog" className="w-full rounded-md mt-4" />

      <div className="flex items-center space-x-2 text-gray-600 mt-4">
        <button onClick={handleLike} className="flex items-center text-blue-600 font-semibold focus:outline-none">
          👍 <span className="ml-1">{likes}</span>
        </button>
        <span>likes</span>
      </div>

      <div className="text-gray-700 mt-4">
        <div dangerouslySetInnerHTML={{ __html: blog.blog_content }} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} onReply={handleReply} />
          ))}
        </div>

        <div className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
          />
          <button
            onClick={handleAddComment}
            className="mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

const Comment = ({ comment, onReply }) => {
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReplySubmit = () => {
    onReply(comment._id, replyText);
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <div className="flex items-center space-x-2 mb-2">
        <img src={comment.comment_by.user_img} alt={comment.comment_by.username} className="w-8 h-8 rounded-full" />
        <p className="font-bold text-gray-800">{comment.comment_by.username}</p>
      </div>
      <p className="text-gray-700 mb-2">{comment.comment_text}</p>
      <div className="space-y-2">
        {comment.reply.map(reply => (
          <div key={reply._id} className="pl-4 border-l-2 border-gray-300 ml-2 text-sm space-y-1">
            <div className="flex items-center space-x-2">
              <img src={reply.comment_by.user_img} alt={reply.comment_by.username} className="w-6 h-6 rounded-full" />
              <p className="font-semibold text-gray-800">{reply.comment_by.username}</p>
            </div>
            <p className="text-gray-600">{reply.comment_text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowReplyBox(!showReplyBox)}
        className="text-blue-500 text-sm mt-2 underline"
      >
        Reply
      </button>

      {showReplyBox && (
        <div className="mt-2">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply..."
            className="w-full p-2 text-sm border border-gray-300 rounded-md bg-gray-50"
          />
          <button
            onClick={handleReplySubmit}
            className="mt-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
