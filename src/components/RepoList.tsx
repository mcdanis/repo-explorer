import React from "react";
import type { Repo } from "../types";

type Props = {
  repos: Repo[];
  loading: boolean;
  selectedUser: { login: string } | null;
};

export default function RepoList({ repos, loading, selectedUser }: Props) {
  if (!selectedUser)
    return <div className="placeholder">Select a user to see repositories</div>;
  if (loading) return <div className="placeholder">Loading repositories…</div>;
  if (!repos.length)
    return (
      <div className="placeholder">
        No repositories found for {selectedUser.login}
      </div>
    );

  return (
    <div>
      <h2>
        Repositories of {selectedUser.login} ({repos.length})
      </h2>
      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo">
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              <div className="repo-head">
                <strong>{repo.name}</strong>
                <span className="meta">
                  ★ {repo.stargazers_count} • Forks {repo.forks_count}
                </span>
              </div>
              {repo.description && <p className="desc">{repo.description}</p>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
