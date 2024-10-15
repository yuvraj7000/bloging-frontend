

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const BlogPage = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [likes, setLikes] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     const get_blog = async () => {
//       try {
//         const response = await axios.post('http://localhost:3002/api/v1/blog/get_blog', {
//           blogId: id
//         }, { withCredentials: true });

//         if (response.status === 200) {
//           const blogData = response.data.blog;
//           console.log(blogData);
//           setBlog(blogData);
//           setLikes(blogData.likes.length); // Assuming likes is an array
//           setComments(blogData.comments);
//           console.log('Blog is fetched');
//         }
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//       }
//     };

//     get_blog();
//   }, [id]);

//   const handleLike = () => {
//     setLikes(likes + 1);
//   };

//   const handleAddComment = () => {
//     if (newComment.trim() !== '') {
//       const comment = {
//         _id: comments.length + 1,
//         comment_by: {
//           username: "Anonymous",
//           user_img: "https://via.placeholder.com/50"
//         },
//         comment_text: newComment,
//         reply: []
//       };
//       setComments([...comments, comment]);
//       setNewComment('');
//     }
//   };

//   const handleReply = (commentId, replyText) => {
//     if (replyText.trim() === '') return;

//     const updatedComments = comments.map(comment =>
//       comment._id === commentId
//         ? { ...comment, reply: [...comment.reply, { _id: comment.reply.length + 1, comment_by: { username: "Anonymous", user_img: "https://via.placeholder.com/50" }, comment_text: replyText }] }
//         : comment
//     );

//     setComments(updatedComments);
//   };

//   if (!blog) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
//       <img src={blog.blog_img} alt="Blog" className="w-full rounded-md" />

//       <div className="flex items-center space-x-2 text-gray-600 mt-4">
//         <button onClick={handleLike} className="flex items-center text-blue-600 font-semibold focus:outline-none">
//           👍 <span className="ml-1">{likes}</span>
//         </button>
//         <span>likes</span>
//       </div>

//       <div className="text-gray-700 mt-4">
//         <p>{blog.blog_content}</p>
//       </div>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
//         <div className="space-y-4">
//           {comments.map(comment => (
//             <Comment key={comment._id} comment={comment} onReply={handleReply} />
//           ))}
//         </div>

//         <div className="mt-6">
//           <textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment..."
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           <button
//             onClick={handleAddComment}
//             className="mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Post Comment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Comment = ({ comment, onReply }) => {
//   const [replyText, setReplyText] = useState('');
//   const [showReplyBox, setShowReplyBox] = useState(false);

//   const handleReplySubmit = () => {
//     onReply(comment._id, replyText);
//     setReplyText('');
//     setShowReplyBox(false);
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-md">
//       <div className="flex items-center space-x-2 mb-2">
//         <img src={comment.comment_by.user_img} alt={comment.comment_by.username} className="w-8 h-8 rounded-full" />
//         <p className="font-bold text-gray-800">{comment.comment_by.username}</p>
//       </div>
//       <p className="text-gray-700 mb-2">{comment.comment_text}</p>
//       <div className="space-y-2">
//         {comment.reply.map(reply => (
//           <div key={reply._id} className="pl-4 border-l-2 border-gray-300 ml-2 text-sm space-y-1">
//             <div className="flex items-center space-x-2">
//               <img src={reply.comment_by.user_img} alt={reply.comment_by.username} className="w-6 h-6 rounded-full" />
//               <p className="font-semibold text-gray-800">{reply.comment_by.username}</p>
//             </div>
//             <p className="text-gray-600">{reply.comment_text}</p>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => setShowReplyBox(!showReplyBox)}
//         className="text-blue-500 text-sm mt-2 underline"
//       >
//         Reply
//       </button>

//       {showReplyBox && (
//         <div className="mt-2">
//           <textarea
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             placeholder="Reply..."
//             className="w-full p-2 text-sm border border-gray-300 rounded-md"
//           />
//           <button
//             onClick={handleReplySubmit}
//             className="mt-1 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const get_blog = async () => {
      try {
        const response = await axios.post('http://localhost:3002/api/v1/blog/get_blog', {
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

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const comment = {
        _id: comments.length + 1,
        comment_by: {
          username: "Anonymous",
          user_img: "https://via.placeholder.com/50"
        },
        comment_text: newComment,
        reply: []
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleReply = (commentId, replyText) => {
    if (replyText.trim() === '') return;

    const updatedComments = comments.map(comment =>
      comment._id === commentId
        ? { ...comment, reply: [...comment.reply, { _id: comment.reply.length + 1, comment_by: { username: "Anonymous", user_img: "https://via.placeholder.com/50" }, comment_text: replyText }] }
        : comment
    );

    setComments(updatedComments);
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
      <img src={blog.blog_img} alt="Blog" className="w-full rounded-md" />

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
            className="w-full p-2 border border-gray-300 rounded-md"
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
            className="w-full p-2 text-sm border border-gray-300 rounded-md"
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