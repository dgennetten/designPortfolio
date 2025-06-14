import { PortfolioItem } from '../types';

export const portfolioItems: PortfolioItem[] = [
  // Logos
  {
    id: 'logo-1',
    name: 'Modern Tech Logo',
    description: 'Clean, minimalist logo design for a technology startup focusing on innovation and simplicity.',
    thumbnail: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    fullImage: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'logos'
  },
  {
    id: 'logo-2',
    name: 'Organic Café Brand',
    description: 'Warm, earthy logo design for an organic coffee shop emphasizing sustainability and community.',
    thumbnail: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    fullImage: 'https://images.pexels.com/photos/1493080/pexels-photo-1493080.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'logos'
  },
  {
    id: 'logo-3',
    name: 'Fashion Boutique',
    description: 'Elegant, sophisticated logo for a high-end fashion boutique with timeless appeal.',
    thumbnail: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    fullImage: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'logos'
  },
  
  // Photographs
  {
    id: 'photo-1',
    name: 'Urban Architecture',
    description: 'Capturing the interplay of light and shadow in modern urban architecture.',
    thumbnail: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    fullImage: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'photographs'
  },
  {
    id: 'photo-2',
    name: 'Nature Portrait',
    description: 'A serene landscape capturing the essence of natural beauty and tranquility.',
    thumbnail: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    fullImage: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'photographs'
  },
  {
    id: 'photo-3',
    name: 'Street Photography',
    description: 'Candid moments of urban life, telling stories through authentic human expressions.',
    thumbnail: 'https://images.pexels.com/photos/1590549/pexels-photo-1590549.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    fullImage: 'https://images.pexels.com/photos/1590549/pexels-photo-1590549.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'photographs'
  },

  // Design Projects
  {
    id: 'project-1',
    name: 'Brand Identity System',
    description: 'Complete brand identity including logo, color palette, typography, and marketing materials.',
    thumbnail: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    fullImage: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'design-projects',
    projectImages: [
      'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    projectImageDescriptions: [
      'Primary logo design with clean typography and modern aesthetic',
      'Brand color palette and typography system showcasing versatility',
      'Marketing materials including business cards and letterhead design'
    ]
  },
  {
    id: 'project-2',
    name: 'Website Redesign',
    description: 'Modern website redesign focusing on user experience and contemporary aesthetics.',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    fullImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'design-projects',
    projectImages: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    projectImageDescriptions: [
      'Homepage design featuring hero section and intuitive navigation',
      'Mobile-responsive layout with optimized user experience',
      'Final implementation showcasing cross-device compatibility'
    ]
  }
];