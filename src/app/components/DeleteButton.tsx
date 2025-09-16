"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  postId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Failed to delete post');
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">Delete Post</button>
  );
};

export default DeleteButton;
