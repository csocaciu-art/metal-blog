import Link from 'next/link';
import Image from 'next/image';
import { readPosts } from '@/lib/postsStore';

const HomePage = async () => {
  const posts = await readPosts();

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
