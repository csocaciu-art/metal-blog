import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'posts.json');

const readPosts = () => {
  const postsData = fs.readFileSync(postsFilePath, 'utf-8');
  return JSON.parse(postsData);
};

const writePosts = (posts: any[]) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
};

export async function GET() {
  const posts = readPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const newPost = await request.json();
  const posts = readPosts();
  newPost.id = (parseInt(posts[posts.length - 1].id) + 1).toString(); // Simple ID generation
  posts.push(newPost);
  writePosts(posts);
  return NextResponse.json(newPost, { status: 201 });
}
