'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const NewPostPage = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPost = {
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
    };

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Metal Blog</a>
        </div>
      </nav>
      <div className="container mt-4">
        <h1>Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" required />
          </div>
          <div className="mb-3">
            <label htmlFor="excerpt" className="form-label">Excerpt</label>
            <textarea className="form-control" id="excerpt" name="excerpt" rows={3} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Content</label>
            <textarea className="form-control" id="content" name="content" rows={10} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default NewPostPage;
