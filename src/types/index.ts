export interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  fullImage: string;
  category: 'logos' | 'photographs' | 'design-projects';
  projectImages?: string[]; // For design projects only
  projectImageDescriptions?: string[]; // Descriptions for each project image
}

export interface Project {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  images: string[];
}