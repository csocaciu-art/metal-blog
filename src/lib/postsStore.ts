import { promises as fs } from 'fs';
import path from 'path';

export interface StoredPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrls: string[];
}

const postsFilePath = path.join(process.cwd(), 'posts.json');

export async function readPosts(): Promise<StoredPost[]> {
  try {
    const postsData = await fs.readFile(postsFilePath, 'utf-8');
    const parsed = JSON.parse(postsData);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'ENOENT'
    ) {
      await fs.writeFile(postsFilePath, '[]', 'utf-8');
      return [];
    }
    throw error;
  }
}

export async function writePosts(posts: StoredPost[]) {
  await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
}

export function nextPostId(posts: StoredPost[]): string {
  const maxId = posts.reduce((max, post) => {
    const numericId = Number(post.id);
    return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
  }, 0);
  return String(maxId + 1);
}
