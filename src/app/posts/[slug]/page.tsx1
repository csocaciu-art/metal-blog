'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrls?: string[];
}

type PostParams = { slug: string };

const PostPage = ({ params }: { params: Promise<PostParams> }) => {
  const router = useRouter();
  const { slug } = React.use(params);   // unwrap params
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`, { cache: 'no-store' });
        if (!res.ok) {
          setError('Failed to fetch post');
          return;
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
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

  if (error) {
    return (
      <div className="container mt-4">
        <div className="post-content">
          <p>{error}</p>
          <Link href="/">
            <Image
              src="/images/back_to_home.jpg"
              alt="Back to Home"
              width={300}
              height={100}
              style={{ height: '100px', width: 'auto' }}
            />
          </Link>
        </div>
      </div>
    );
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
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '500px',
                  }}
                >
                  <Image
                    src={url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        <Link href="/">
          <Image
            src="/images/back_to_home.jpg"
            alt="Back to Home"
            width={300}
            height={100}
            style={{ height: '100px', width: 'auto' }}
          />
        </Link>
        <Link href={`/edit-post/${post.id}`}>
          <Image
            src="/images/edit_post.jpg"
            alt="Edit Post"
            width={300}
            height={100}
            style={{ height: '100px', width: 'auto' }}
          />
        </Link>
        <Image
          src="/images/delete_post.jpg"
          alt="Delete Post"
          width={300}
          height={100}
          style={{ height: '100px', width: 'auto', cursor: 'pointer' }}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default PostPage;

