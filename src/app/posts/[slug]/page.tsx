"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const post = await getPost(params.slug);

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to delete post');
    }
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <div className="container mt-4">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <a href="/" className="btn btn-primary me-2">Back to Home</a>
        <a href={`/edit-post/${post.id}`} className="btn btn-secondary me-2">Edit Post</a>
        <button onClick={handleDelete} className="btn btn-danger">Delete Post</button>
      </div>
    </div>
  );
};

export default PostPage;
