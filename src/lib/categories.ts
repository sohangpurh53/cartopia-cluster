export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Door Locks",
    slug: "door-locks",
    description: "Smart and traditional door locks",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827",
  },
  {
    id: "2",
    name: "Cameras",
    slug: "cameras",
    description: "Security cameras and surveillance systems",
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb",
  },
  {
    id: "3",
    name: "Handles",
    slug: "handles",
    description: "Door handles and knobs",
    image: "https://images.unsplash.com/photo-1578898887155-72e9a7da1fb3",
  }
];

export const getCategories = () => categories;

export const getCategoryBySlug = (slug: string) => 
  categories.find(category => category.slug === slug);

export const getCategoryById = (id: string) => 
  categories.find(category => category.id === id);

export const getSubcategories = (parentId: string) =>
  categories.filter(category => category.parentId === parentId);