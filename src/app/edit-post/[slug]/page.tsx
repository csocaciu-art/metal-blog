'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrls?: string[];
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
    if (post?.imageUrls) {
      post.imageUrls.forEach(url => formData.append('existingImageUrls', url));
    }
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      body: formData,
    });

    if (res.ok) {
      router.push(`/posts/${slug}`);
    } else {
      alert('Failed to update post');
    }
  };

  const handleImageDelete = (imageUrl: string) => {
    if (post) {
      const updatedImageUrls = post.imageUrls?.filter(url => url !== imageUrl);
      setPost({ ...post, imageUrls: updatedImageUrls });
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
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Images</label>
              <input type="file" className="form-control" id="image" name="image" accept="image/*" multiple />
              <div className="mt-2 d-flex flex-wrap">
                {post.imageUrls && post.imageUrls.map(imageUrl => (
                  <div key={imageUrl} className="me-2 mb-2 position-relative">
                    <img src={imageUrl} alt={post.title} width="200" />
                    <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0" onClick={() => handleImageDelete(imageUrl)}>X</button>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" style={{ background: 'none', border: 'none' }}>
              <img src="/images/update_post.jpg" alt="Update Post" style={{ height: '100px', cursor: 'pointer' }} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
