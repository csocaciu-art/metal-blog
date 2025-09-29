import React from 'react';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
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
        <a href="/new-post">
          <img src="/images/create_new_post.jpg" alt="Create New Post" style={{ height: '200px' }} />
        </a>
      </div>

      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.excerpt}</p>
                <a href={`/posts/${post.id}`}>
                  <img src="/images/read_more.jpg" alt="Read More" style={{ height: '100px' }} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;