'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}

const EditPostPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { slug } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        alert('Failed to fetch post');
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedPost = {
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
    };

    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    });

    if (res.ok) {
      router.push(`/posts/${slug}`);
    } else {
      alert('Failed to update post');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <div className="container mt-4">
        <h1>Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" defaultValue={post.title} required />
          </div>
          <div className="mb-3">
            <label htmlFor="excerpt" className="form-label">Excerpt</label>
            <textarea className="form-control" id="excerpt" name="excerpt" rows={3} defaultValue={post.excerpt} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea className="form-control" id="content" name="content" rows={10} defaultValue={post.content} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
