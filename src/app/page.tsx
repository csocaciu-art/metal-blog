import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}

async function getPosts(): Promise<Post[]> {
  const headerList = headers();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (headerList.get('host')
      ? `${headerList.get('x-forwarded-proto') ?? 'http'}://${headerList.get('host')}`
      : '');
  const res = await fetch(`${baseUrl}/api/posts`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

const HomePage = async () => {
  const posts = await getPosts();

  return (
    <div>
      <div className="mb-4">
        <Link href="/new-post">
          <Image
            src="/images/create_new_post.jpg"
            alt="Create New Post"
            width={400}
            height={200}
            style={{ height: '200px', width: 'auto' }}
            priority
          />
        </Link>
      </div>

      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.excerpt}</p>
                <Link href={`/posts/${post.id}`}>
                  <Image
                    src="/images/read_more.jpg"
                    alt="Read More"
                    width={300}
                    height={100}
                    style={{ height: '100px', width: 'auto' }}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;