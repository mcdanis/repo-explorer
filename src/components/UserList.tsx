import React from "react";
import type { GithubUser } from "../types";

type Props = {
  users: GithubUser[];
  onUserClick: (u: GithubUser) => void;
  selected?: string | null;
};

export default function UserList({ users, onUserClick, selected }: Props) {
  if (!users.length)
    return <div className="empty">No users — try a different query</div>;

  return (
    <ul className="user-list" role="list">
      {users.map((u) => (
        <li
          key={u.id}
          className={u.login === selected ? "user selected" : "user"}
        >
          <button
            onClick={() => onUserClick(u)}
            aria-pressed={u.login === selected}
          >
            <img src={u.avatar_url} alt={`Avatar of ${u.login}`} />
            <div>
              <div className="login">{u.login}</div>
              <a
                href={u.html_url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                View profile
              </a>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
