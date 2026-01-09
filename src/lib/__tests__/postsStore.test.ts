import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { promises as fs } from 'fs';
import { readPosts, nextPostId, StoredPost } from '../postsStore';

// Mock fs module
vi.mock('fs', () => {
  const readFile = vi.fn();
  const writeFile = vi.fn();
  return {
    promises: {
      readFile,
      writeFile,
    },
    default: {
      promises: {
        readFile,
        writeFile,
      },
    },
  };
});

describe('postsStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('readPosts', () => {
    it('should return posts when file exists', async () => {
      const mockPosts: StoredPost[] = [
        {
          id: '1',
          title: 'Test Post',
          excerpt: 'Excerpt',
          content: 'Content',
          imageUrls: [],
        },
      ];
      // Cast the imported function to Mock
      (fs.readFile as Mock).mockResolvedValue(JSON.stringify(mockPosts));

      const posts = await readPosts();
      expect(posts).toEqual(mockPosts);
      expect(fs.readFile).toHaveBeenCalled();
    });

    it('should return empty array and create file if file does not exist (ENOENT)', async () => {
      const error: any = new Error('File not found');
      error.code = 'ENOENT';
      (fs.readFile as Mock).mockRejectedValue(error);

      const posts = await readPosts();
      expect(posts).toEqual([]);
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('posts.json'),
        '[]',
        'utf-8'
      );
    });

    it('should throw other errors', async () => {
      const error = new Error('Other error');
      (fs.readFile as Mock).mockRejectedValue(error);

      await expect(readPosts()).rejects.toThrow('Other error');
    });
  });

  describe('nextPostId', () => {
    it('should return "1" for empty list', () => {
      expect(nextPostId([])).toBe('1');
    });

    it('should return next incremented id', () => {
      const posts: StoredPost[] = [
        { id: '1', title: 'P1', excerpt: '', content: '', imageUrls: [] },
        { id: '5', title: 'P5', excerpt: '', content: '', imageUrls: [] },
      ];
      expect(nextPostId(posts)).toBe('6');
    });
  });
});
