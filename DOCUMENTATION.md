# Project Documentation: Metal-Blog

## 1. Project Overview

This project is a web application for a blog focused on metal music. It allows users to view posts and read articles. This documentation outlines the technologies used to build the site, with explanations suitable for a high school level project presentation.

## 2. Core Technologies

The application is built using a modern and powerful stack of web technologies.

### Next.js

*   **What it is:** A popular and powerful framework for building web applications using the React library.
*   **Why it's used:** Next.js provides a robust structure for creating websites. It includes features like a file-based router (making page navigation intuitive to code), server-side rendering (which helps the site load fast and be easily found by search engines like Google), and optimizations for images and fonts. This project uses the **App Router**, which is the latest and recommended way of building applications in Next.js.

*   **Code Example (File-based Routing):**
    The file path `src/app/posts/[slug]/page.tsx` itself defines a dynamic page. Any URL like `/posts/hello-world` will be handled by this component, and the value `"hello-world"` is passed as the `slug` parameter.

    ```tsx
    // src/app/posts/[slug]/page.tsx

    // This interface defines the expected params from the URL
    interface PostPageProps {
      params: {
        slug: string;
      };
    }

    // The component receives the params object
    export default async function PostPage({ params }: PostPageProps) {
      // You can now use params.slug to fetch and display the specific post
      const post = await getPostData(params.slug);

      return (
        <div>
          <h1>{post.title}</h1>
          <article>{post.content}</article>
        </div>
      );
    }
    ```

### React

*   **What it is:** A JavaScript library for building user interfaces (UIs). Think of it as a toolbox for creating the visual parts of a website.
*   **Why it's used:** React allows developers to build the UI out of reusable "components." For example, a single `PostCard` component can be designed once and then reused to display every blog post on the homepage. This makes the code clean, organized, and easier to manage.

*   **Code Example (React Component):**
    A component is typically a function that returns HTML-like syntax called JSX. This example shows a simple button component.

    ```tsx
    // src/app/components/DeleteButton.tsx

    import { Button } from 'react-bootstrap';

    // 'Props' are properties passed to the component
    interface DeleteButtonProps {
      postId: string;
    }

    export default function DeleteButton({ postId }: DeleteButtonProps) {
      
      const handleDelete = () => {
        console.log(`Deleting post ${postId}`);
        // Logic to call an API to delete the post
      };

      return (
        <Button variant="danger" onClick={handleDelete}>
          Delete Post
        </Button>
      );
    }
    ```

### TypeScript

*   **What it is:** A programming language that is a "superset" of JavaScript. It adds features on top of JavaScript, most notably "static typing."
*   **Why it's used:** In simple terms, TypeScript helps prevent bugs. It allows the developer to define the expected "shape" of data. For example, we can specify that a blog post's `title` must always be a string of text. If we accidentally try to use a number, TypeScript will flag it as an error during development, long before the code reaches the user. This makes the application more reliable.

*   **Code Example (Defining a Type):**
    An `interface` is used to define the structure of an object. This ensures that any `Post` object in the application will have a consistent structure.

    ```typescript
    // src/app/types/Post.ts

    export interface Post {
      slug: string;
      title: string;
      author: string;
      publishDate: string; // e.g., "2024-10-26"
      content: string;
    }
    ```

## 3. Styling and User Interface

### Bootstrap & React-Bootstrap

*   **What it is:** Bootstrap is a massive CSS framework that provides pre-designed components like navigation bars, buttons, cards, and grids. React-Bootstrap is a library that wraps these components so they can be used seamlessly within a React application.
*   **Why it's used:** Using a framework like Bootstrap dramatically speeds up development. It provides a professional look and feel out-of-the-box and ensures that the website is "responsive," meaning it will automatically adjust its layout to look great on any device, from a large desktop monitor to a small mobile phone screen.

*   **Code Example (Using a Card Component):**
    Instead of writing complex HTML and CSS for a card, you can import the `Card` component from `react-bootstrap` and use it directly.

    ```tsx
    // src/app/page.tsx (Simplified)

    import { Card, Button } from 'react-bootstrap';
    import { Post } from './types/Post'; // Assuming types are defined

    export default function HomePage() {
      const posts: Post[] = [/* ...array of post objects... */];

      return (
        <div>
          {posts.map(post => (
            <Card key={post.slug} style={{ width: '18rem', marginBottom: '1rem' }}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>By {post.author}</Card.Text>
                <Button variant="outline-light" href={`/posts/${post.slug}`}>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
    }
    ```

### Global CSS

*   **What it is:** A custom stylesheet located at `src/app/globals.css`.
*   **Why it's used:** While Bootstrap provides the main components, this file is used to apply custom styles and tweaks across the entire application. This is where base fonts, background colors, and other site-wide design choices are defined to give the blog its unique identity.

*   **Code Example (Defining Body Styles):**
    This snippet from `globals.css` sets a dark background color and a light text color for the entire website's `<body>` tag.

    ```css
    /* src/app/globals.css */

    body {
      background-color: #121212;
      color: #e1e1e1;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    a {
      color: #bb86fc;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
    ```

## 4. Development Environment and Tooling

### Node.js

*   **What it is:** A runtime environment that allows JavaScript to be executed on a server, outside of a web browser.
*   **Why it's used:** Modern web development tools, including Next.js, are built on top of Node.js. It runs the local development server, builds the final website files, and manages all the project's dependencies.

### npm (Node Package Manager)

*   **What it is:** The default package manager for Node.js. It is used to install and manage all the external libraries and frameworks (like React, Next.js, and Bootstrap) that the project depends on. The `package.json` file is the configuration file for npm, listing all dependencies.

## 5. Version Control & Collaboration

### Git
*   **What it is:** Git is a **version control system**. Think of it as a powerful "undo" and "history" tracker for your entire project. It takes snapshots (called "commits") of your code at different points in time.
*   **Why it's used:** It allows you to save your work at any stage and revert to a previous version if a change introduces a bug. It's the standard tool for tracking changes in software development, preventing data loss, and managing different features.

*   **Code Example (Basic Workflow):**
    A typical workflow involves adding your changed files, creating a commit with a descriptive message, and then pushing those changes to a remote repository.
    ```bash
    # Stage a file for the next commit
    git add src/app/page.tsx

    # Create a snapshot (commit) of the staged changes
    git commit -m "feat: Update homepage layout"

    # Send the commit to a remote server like GitHub
    git push
    ```

### GitHub
*   **What it is:** GitHub is a web-based platform for hosting Git repositories. It's a place on the internet to store your code and collaborate with others.
*   **Why it's used:** GitHub serves as the central, remote backup for this project's codebase. By "pushing" commits to GitHub, the code is saved online, protecting it from local computer issues. It also provides a web interface to view the code, track issues, and manage the project's history. This project's repository is hosted on GitHub.

## 6. Deployment & Hosting

This project is designed to be self-hosted on a low-cost home server, which is a valuable real-world engineering challenge.

### Raspberry Pi
*   **What it is:** A small, single-board computer, about the size of a credit card.
*   **Why it's used:** It acts as the physical server for the web application. Its low power consumption makes it perfect for running 24/7 as a home server without a high electricity cost. The Next.js application runs directly on the Raspberry Pi's operating system (a version of Linux, like Raspberry Pi OS).

### Nginx Reverse Proxy
*   **What it is:** Nginx (pronounced "Engine-X") is a high-performance web server. In this project, it is configured as a **reverse proxy**.
*   **Why it's used:** Instead of exposing the Next.js application directly to the internet, Nginx sits in front of it and acts like a receptionist for web traffic. It receives all requests and forwards them to the Next.js application, which runs on an internal port (e.g., port 3000). This is a standard industry practice for:
    *   **Security:** It hides the application server from the public internet.
    *   **Performance:** Nginx is very efficient at handling many connections.
    *   **Flexibility:** It can manage multiple websites on the same Raspberry Pi and handle SSL/TLS certificates for secure HTTPS connections.

### Dynamic DNS (DDNS)
*   **What it is:** A service that maps a domain name (e.g., `my-metal-blog.example.com`) to a dynamic, or changing, IP address.
*   **Why it's used:** Most home internet connections have a dynamic IP address from the Internet Service Provider (ISP) that can change. A DDNS service automatically updates the domain name to point to the new IP address whenever it changes. This ensures the website is always reachable using the same memorable domain name.

### Port Forwarding
*   **What it is:** A configuration rule set on a home router.
*   **Why it's used:** By default, home routers block incoming traffic for security. Port forwarding tells the router to open specific ports (like port 80 for HTTP and 443 for HTTPS) and forward any traffic on those ports to the internal IP address of the Raspberry Pi.

### How It All Works Together

Here is the journey of a request from a user to the application:

1.  A user types your domain name into their browser.
2.  The **Dynamic DNS** service directs the request to your home network's current IP address.
3.  The request arrives at your home **router**.
4.  The router's **Port Forwarding** rule sends the request to the **Raspberry Pi**.
5.  **Nginx** on the Raspberry Pi receives the request and forwards it to the Next.js application.
6.  The Next.js application sends the response back through the same chain.