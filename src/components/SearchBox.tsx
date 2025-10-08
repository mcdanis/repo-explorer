import React, { useState } from "react";

type Props = { onSearch: (q: string) => void };

export default function SearchBox({ onSearch }: Props) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    try {
      await onSearch(q);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="search" onSubmit={handleSubmit} role="search">
      <label htmlFor="search-input" className="visually-hidden">
        Search GitHub username
      </label>
      <input
        id="search-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type username... (press enter or click search)"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setQ("");
          }
        }}
        aria-label="Search GitHub username"
      />
      <button type="submit" disabled={loading} aria-busy={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
