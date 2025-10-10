"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Author {
  _id: string;
  username: string;
  email: string;
}

interface Comment {
  _id?: string;
  author: Author | string;
  content: string;
  createdAt?: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: Author;
  likes: string[];
  dislikes: string[];
  comments: Comment[];
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [disliked, setDisliked] = useState(false);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [liking, setLiking] = useState(false);
  const [disliking, setDisliking] = useState(false);

  
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

 
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setBlog(data);
        setLikesCount(data.likes?.length || 0);
        setDislikesCount(data.dislikes?.length || 0);
        setComments(data.comments || []);
        setLiked(userId ? data.likes?.includes(userId) : false);
        setDisliked(userId ? data.dislikes?.includes(userId) : false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, userId]);

 
  const handleLike = async () => {
    if (!userId || liking) return;
    setLiking(true);
    try {
      const action = liked ? 'unlike' : 'like';
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId }),
      });
      if (!res.ok) throw new Error('Failed to update like');
      const data = await res.json();
      setLiked(data.liked);
      setLikesCount(data.likes);
      if (data.liked && disliked) {
        setDisliked(false);
      }
    } catch (err) {
      console.error('Like error:', err);
    } finally {
      setLiking(false);
    }
  };

 
  const handleDislike = async () => {
    if (!userId || disliking) return;
    setDisliking(true);
    try {
      const action = disliked ? 'undislike' : 'dislike';
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userId }),
      });
      if (!res.ok) throw new Error('Failed to update dislike');
      const data = await res.json();
      setDisliked(data.disliked);
      setDislikesCount(data.dislikes);
  
      if (data.disliked && liked) {
        setLiked(false);
      }
    } catch (err) {
      console.error('Dislike error:', err);
    } finally {
      setDisliking(false);
    }
  };

 
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !newComment.trim()) return;
    setSubmitting(true);
    try {
      console.log('Posting comment:', { id, userId, content: newComment.trim() });
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'comment', userId, content: newComment.trim() }),
      });
      console.log('Response status:', res.status);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to add comment: ${res.status} ${res.statusText}`);
      }
      const newCommentData = await res.json();
      console.log('New comment data:', newCommentData);
      setComments([...comments, newCommentData]);
      setNewComment('');
    } catch (err) {
      console.error('Comment error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {blog.image && (
        <div className="relative w-full h-80 mb-6 rounded-xl overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        By {blog.author?.username || "Unknown"} •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line mb-8">
        {blog.content}
      </p>

      <div className="flex items-center gap-6 mb-8">
        {userId ? (
          <>
            <button
              onClick={handleLike}
              disabled={liking}
              className={`flex items-center gap-2 hover:text-blue-600 ${
                liked ? "text-blue-600" : "text-gray-700"
              } ${liking ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={handleDislike}
              disabled={disliking}
              className={`flex items-center gap-2 hover:text-red-600 ${
                disliked ? "text-red-600" : "text-gray-700"
              } ${disliking ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ThumbsDown className="w-5 h-5" />
              <span>{dislikesCount}</span>
            </button>
          </>
        ) : (
          <div className="text-gray-500">
            <p>Sign in to like or dislike this post.</p>
            <div className="mt-2 flex gap-2">
              <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Sign In
              </Link>
              <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Sign Up
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-700">
          <MessageCircle className="w-5 h-5" />
          <span>{blog.comments.length}</span>
        </div>
      </div>


      
      {userId ? (
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
          <form onSubmit={handleComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full border rounded-lg p-3 mb-3"
              required
            />
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        </div>
      ) : (
        <div className="border-t pt-6">
          <p className="text-gray-500">Sign in to leave a comment.</p>
          <div className="mt-2 flex gap-2">
            <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Sign In
            </Link>
            <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Sign Up
            </Link>
          </div>
        </div>
      )}

      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>
        {blog.comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {blog.comments.map((c, i) => (
              <li key={i} className="border-b pb-2">
                <p className="font-semibold">
                  {typeof c.author === "string"
                    ? "Anonymous"
                    : c.author.username}
                </p>
                <p className="text-gray-700">{c.content}</p>
                <span className="text-xs text-gray-400">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString()
                    : "Just now"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
