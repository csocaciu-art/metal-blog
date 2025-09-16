# Copilot Instructions for metal-blog

## Project Overview
- **Framework:** Next.js (TypeScript)
- **Structure:**
  - `src/app/` contains all main app logic, including routing, API endpoints, and UI components.
  - `public/images/` holds static image assets.
  - `posts.json` is the main data source for blog posts.

## Key Architectural Patterns
- **Routing:**
  - Uses Next.js App Router (`src/app/`).
  - Dynamic routes for posts: `src/app/posts/[slug]/page.tsx` (view), `src/app/edit-post/[slug]/page.tsx` (edit).
  - API routes: `src/app/api/posts/` (CRUD for posts), `src/app/api/images/` (image handling).
- **Data Flow:**
  - Blog post data is read from and written to `posts.json` via API routes.
  - UI components fetch data using these API endpoints.
- **Components:**
  - Shared React components in `src/app/components/` (e.g., `DeleteButton.tsx`).

## Developer Workflows
- **Start Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Test:** (No test setup detected; add if needed)

## Project-Specific Conventions
- **Image Handling:**
  - All images are stored in `public/images/` and referenced by relative path.
- **Post Slugs:**
  - Slugs are used as unique identifiers for posts and as dynamic route params.
- **API Design:**
  - API endpoints are colocated with app logic under `src/app/api/`.
  - Use RESTful conventions for posts (GET, POST, PUT, DELETE).

## Integration Points
- **External Dependencies:**
  - Standard Next.js/React/TypeScript stack (see `package.json`).
- **No database:**
  - All persistent data is in `posts.json` (JSON file-based storage).

## Examples
- To add a new post: POST to `/api/posts/` with post data; UI at `/new-post`.
- To edit a post: PUT to `/api/posts/[slug]`; UI at `/edit-post/[slug]`.
- To delete a post: DELETE to `/api/posts/[slug]` or use `DeleteButton` component.

## References
- **Routing:** `src/app/posts/[slug]/page.tsx`, `src/app/edit-post/[slug]/page.tsx`
- **API:** `src/app/api/posts/route.ts`, `src/app/api/posts/[slug]/route.ts`
- **Data:** `posts.json`
- **Components:** `src/app/components/`

---

For questions or unclear patterns, ask for clarification or check the referenced files above.
