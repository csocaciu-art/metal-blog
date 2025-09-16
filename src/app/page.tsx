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
      <nav className="navbar navbar-expand-lg navbar-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-skull" style={{marginRight: '8px'}}>
                <path d="M12 2a10 10 0 0 0-9 14.5c.5 1.5 2 2.5 4 2.5h10c2 0 3.5-1 4-2.5A10 10 0 0 0 12 2z"></path>
                <circle cx="9" cy="10" r="1"></circle>
                <circle cx="15" cy="10" r="1"></circle>
                <path d="M8 16s1.5 2 4 2 4-2 4-2"></path>
            </svg>
            Metal Blog
          </a>
        </div>
      </nav>

      <div className="jumbotron">
        <h1 className="display-4">Welcome to the Metal Blog</h1>
        <p className="lead">Your one-stop shop for brutal riffs and breakdowns.</p>
        <hr className="my-4" />
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="/new-post" role="button">Create New Post</a>
        </p>
      </div>

      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.excerpt}</p>
                <a href={`/posts/${post.id}`} className="btn btn-primary">Read More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;