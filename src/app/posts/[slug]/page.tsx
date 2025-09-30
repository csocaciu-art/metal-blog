"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Carousel from 'react-bootstrap/Carousel';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrls?: string[];
}

const PostPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { slug } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/api/posts/${slug}`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to fetch post');
      }
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };
    getPost();
  }, [slug]);

  const handleDelete = async () => {
    if (!post) return;
    const res = await fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to delete post');
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
        <div className="post-content">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
        {post.imageUrls && post.imageUrls.length > 0 && (
          <Carousel>
            {post.imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={url}
                  alt={post.title}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        <a href="/">
          <img src="/images/back_to_home.jpg" alt="Back to Home" style={{ height: '100px' }} />
        </a>
        <a href={`/edit-post/${post.id}`}>
          <img src="/images/edit_post.jpg" alt="Edit Post" style={{ height: '100px' }} />
        </a>
        <img src="/images/delete_post.jpg" alt="Delete Post" style={{ height: '100px', cursor: 'pointer' }} onClick={handleDelete} />
      </div>
    </div>
  );
};

export default PostPage;