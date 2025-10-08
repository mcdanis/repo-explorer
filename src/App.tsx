import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import UserList from "./components/UserList";
import RepoList from "./components/RepoList";
import type { GithubUser, Repo } from "./types";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN ?? "";

export default function App() {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function searchUsers(query: string) {
    setError(null);
    setSelectedUser(null);
    setRepos([]);

    if (!query.trim()) {
      setUsers([]);
      return;
    }

    try {
      const params = new URLSearchParams({
        q: query + " in:login",
        per_page: "10",
      });
      const res = await fetch(
        `https://api.github.com/search/users?${params.toString()}`,
        {
          headers: GITHUB_TOKEN
            ? { Authorization: `token ${GITHUB_TOKEN}` }
            : undefined,
        }
      );

      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

      const data = await res.json();
      setUsers(data.items ?? []);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    }
  }

  async function fetchAllRepos(username: string) {
    setError(null);
    setLoadingRepos(true);
    setRepos([]);
    try {
      const perPage = 100;
      let page = 1;
      let all: Repo[] = [];

      while (true) {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(
            username
          )}/repos?per_page=${perPage}&page=${page}`,
          {
            headers: GITHUB_TOKEN
              ? { Authorization: `token ${GITHUB_TOKEN}` }
              : undefined,
          }
        );

        if (res.status === 404) throw new Error("User not found");
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

        const pageData: Repo[] = await res.json();
        if (!pageData.length) break;
        all = all.concat(pageData);
        if (pageData.length < perPage) break;
        page += 1;
      }

      setRepos(all.sort((a, b) => b.stargazers_count - a.stargazers_count));
      setLoadingRepos(false);
    } catch (err: any) {
      setLoadingRepos(false);
      setError(err.message ?? "Unknown error");
    }
  }

  function onUserClick(user: GithubUser) {
    setSelectedUser(user);
    fetchAllRepos(user.login);
  }

  return (
    <div className="app">
      <header className="header">
        <h1>GitHub Repos Explorer</h1>
        <p className="muted">
          Search for users and click a user to see their repositories
        </p>
      </header>

      <main>
        <SearchBox onSearch={searchUsers} />

        {error && (
          <div role="alert" className="error">
            {error}
          </div>
        )}

        <div className="layout">
          <aside className="sidebar">
            <UserList
              users={users}
              onUserClick={onUserClick}
              selected={selectedUser?.login}
            />
          </aside>

          <section className="content">
            <RepoList
              repos={repos}
              loading={loadingRepos}
              selectedUser={selectedUser}
            />
          </section>
        </div>
      </main>

      <footer className="footer">
        <small>Repo Explorer — Find someone and See their Repository</small>
      </footer>
    </div>
  );
}
