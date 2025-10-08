# GitHub Repositories Explorer

A small React + TypeScript app that searches GitHub users and displays repositories for a selected user.

## Features

- Search for up to 5 users by username (uses GitHub Search API)
- Click a user to fetch and display all their repositories (pagination handled)
- Loading states, error handling, keyboard support (Enter to search, Escape to clear input)
- Mobile-friendly layout

## Tech

- React + TypeScript (Vite)
- Fetch API

## Running locally

1. Clone repo

```bash
git clone <your-repo-url>
cd github-repo-explorer
npm install
```

2. (Optional) Provide a GitHub personal access token to increase rate limits. Create a `.env` with:

```
VITE_GITHUB_TOKEN=ghp_...
```

3. Run dev server

```bash
npm run dev
```

## Notes & limitations

- Unauthenticated requests are subject to GitHub API rate limits. Use a token in `.env` for higher limits.
- This demo focuses on correctness, accessibility, and small bundle footprint.

## Nice-to-haves if extended

- Unit and integration tests (Jest/React Testing Library)
- Caching users/repo responses
- Sorting/filtering UI for repositories
