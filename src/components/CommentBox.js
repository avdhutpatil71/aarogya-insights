"use client";
import { useState, useEffect } from "react";

export default function CommentBox({ postId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reply state
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyName, setReplyName] = useState("");
  const [replyComment, setReplyComment] = useState("");

  useEffect(() => {
    fetchComments();
    fetchReplies();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchReplies = async () => {
    try {
      const res = await fetch(`/api/replies?postId=${postId}`);
      const data = await res.json();
      setReplies(data);
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !comment) return alert("All fields are required");

    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, comment, postId }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    if (!replyName || !replyComment) return alert("Please fill all fields.");

    try {
      const res = await fetch("/api/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: replyName, comment: replyComment, parentId, postId }),
      });

      if (res.ok) {
        setReplyName("");
        setReplyComment("");
        setReplyingTo(null);
        fetchReplies();
      }
    } catch (err) {
      console.error("Error posting reply:", err);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Comments List */}
      {comments.map((c) => (
        <div key={c._id} className="border-b border-gray-200 pb-6">
          {/* Comment Header */}
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="font-semibold text-gray-800">
              {c.name}
              <span className="text-gray-500 text-sm ml-2">
                on {new Date(c.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </p>
          </div>

          {/* Comment Content */}
          <div className="ml-12">
            <p className="italic text-gray-700 border-l-4 border-blue-500 pl-4 mb-3">
              “{c.comment}”
            </p>

            {/* Reply Button */}
            <button
              onClick={() => setReplyingTo(replyingTo === c._id ? null : c._id)}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Reply
            </button>

            {/* Reply Form */}
            {replyingTo === c._id && (
              <form onSubmit={(e) => handleReplySubmit(e, c._id)} className="mt-4 space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <input
                  type="text"
                  value={replyName}
                  onChange={(e) => setReplyName(e.target.value)}
                  placeholder="Your name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <textarea
                  value={replyComment}
                  onChange={(e) => setReplyComment(e.target.value)}
                  placeholder="Write your reply..."
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                  required
                ></textarea>
                <div className="flex gap-3">
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300">
                    Post Reply
                  </button>
                  <button type="button" onClick={() => setReplyingTo(null)} className="text-gray-500 hover:text-gray-700">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Replies List */}
            {replies
              .filter((r) => r.parentId === c._id)
              .map((r) => (
                <div key={r._id} className="ml-10 mt-3 bg-gray-50 border-l-2 border-blue-400 pl-4 py-2 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-900">{r.name}:</span> {r.comment}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Add New Comment */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md border border-gray-200/40">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email (will not be published) *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            rows="4"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Posting..." : "Submit Comment"}
          </button>
        </form>
      </div>
    </div>
  );
}
