import React, { useState } from 'react';

const BlogPage = () => {
  const blog = {
    title: "Exploring the Future of Technology",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend lectus at volutpat.",
    likes: 123,
    image: "https://via.placeholder.com/800x400",
    comments: [
      {
        id: 1,
        author: "John Doe",
        text: "Great insights!",
        replies: [
          { id: 1, author: "Jane Smith", text: "I totally agree!" }
        ]
      },
      {
        id: 2,
        author: "Alice Brown",
        text: "Thanks for sharing this.",
        replies: []
      }
    ]
  };

  const [likes, setLikes] = useState(blog.likes);
  const [comments, setComments] = useState(blog.comments);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const comment = {
        id: comments.length + 1,
        author: "Anonymous",
        text: newComment,
        replies: []
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleReply = (commentId, replyText) => {
    if (replyText.trim() === '') return;

    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, { id: comment.replies.length + 1, author: "Anonymous", text: replyText }] }
        : comment
    );

    setComments(updatedComments);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
      <img src={blog.image} alt="Blog" className="w-full rounded-md" />

      <div className="flex items-center space-x-2 text-gray-600 mt-4">
        <button onClick={handleLike} className="flex items-center text-blue-600 font-semibold focus:outline-none">
          👍 <span className="ml-1">{likes}</span>
        </button>
        <span>likes</span>
      </div>

      <div className="text-gray-700 mt-4">
        <p>{blog.content}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
        <div className="space-y-4">
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} onReply={handleReply} />
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
    onReply(comment.id, replyText);
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <div className="flex items-center space-x-2 mb-2">
        <p className="font-bold text-gray-800">{comment.author}</p>
      </div>
      <p className="text-gray-700 mb-2">{comment.text}</p>
      <div className="space-y-2">
        {comment.replies.map(reply => (
          <div key={reply.id} className="pl-4 border-l-2 border-gray-300 ml-2 text-sm space-y-1">
            <p className="font-semibold text-gray-800">{reply.author}</p>
            <p className="text-gray-600">{reply.text}</p>
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
