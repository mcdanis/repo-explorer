export type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  score?: number;
};

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
};
