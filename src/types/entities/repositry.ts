export interface RepositoryProps {
  id: number;
  full_name: string;
  html_url: string;
  description: string;
  updated_at: string;
  forks_count: number;
  stargazers_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}
