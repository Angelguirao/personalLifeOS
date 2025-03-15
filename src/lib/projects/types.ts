
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  live_url?: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}
