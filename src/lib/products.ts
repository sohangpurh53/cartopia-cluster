export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  rating: number;
  stock: number;
  features: {
    material?: string;
    dimensions?: string;
    technicalSpecs?: string[];
  };
  dateAdded: string;
  popularity: number;
  slug: string;
  additionalImages?: string[];
}

// Mock data with enhanced details
export const products: Product[] = [
  {
    id: "1",
    name: "Smart Door Lock X1",
    slug: "smart-door-lock-x1",
    description: "Advanced biometric door lock with fingerprint recognition",
    price: 299.99,
    category: "Door Locks",
    brand: "Qubo",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    additionalImages: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    ],
    rating: 4.5,
    stock: 10,
    features: {
      material: "Stainless Steel",
      dimensions: "5.9 x 3.1 x 1.2 inches",
      technicalSpecs: ["Fingerprint Recognition", "Battery Life: 12 months", "Bluetooth Enabled"]
    },
    dateAdded: "2024-02-15",
    popularity: 95
  },
  {
    id: "2",
    name: "Security Camera Pro",
    slug: "security-camera-pro",
    description: "1080p HD security camera with night vision",
    price: 159.99,
    category: "Cameras",
    brand: "Rehau",
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    stock: 15,
    features: {
      material: "ABS Plastic",
      dimensions: "3.5 x 3.5 x 4.7 inches",
      technicalSpecs: ["1080p HD", "Night Vision", "Motion Detection"]
    },
    dateAdded: "2024-02-10",
    popularity: 88
  },
  {
    id: "3",
    name: "Premium Door Handle",
    slug: "premium-door-handle",
    description: "Modern minimalist door handle with brushed finish",
    price: 79.99,
    category: "Handles",
    brand: "Tagus",
    image: "https://images.unsplash.com/photo-1578898887155-72e9a7da1fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    rating: 4.3,
    stock: 20,
    features: {
      material: "Aluminum",
      dimensions: "8.2 x 2.1 x 1.5 inches",
      technicalSpecs: ["Brushed Finish", "Easy Installation"]
    },
    dateAdded: "2024-02-01",
    popularity: 75
  }
];

export const getProducts = () => products;

export const getProductBySlug = (slug: string) => 
  products.find(product => product.slug === slug);

export const getProductById = (id: string) => 
  products.find(product => product.id === id);

export const getProductsByCategory = (category: string) =>
  products.filter(product => product.category === category);

export const getRelatedProducts = (category: string) =>
  products.filter(product => product.category === category).slice(0, 4);

export const searchProducts = (query: string) =>
  products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

export const filterProducts = (products: Product[], filters: {
  categories?: string[];
  priceRange?: { min: number; max: number };
  brands?: string[];
  rating?: number;
  materials?: string[];
}) => {
  return products.filter(product => {
    if (filters.categories?.length && !filters.categories.includes(product.category)) return false;
    if (filters.priceRange && (product.price < filters.priceRange.min || product.price > filters.priceRange.max)) return false;
    if (filters.brands?.length && !filters.brands.includes(product.brand)) return false;
    if (filters.rating && product.rating < filters.rating) return false;
    if (filters.materials?.length && !filters.materials.includes(product.features.material || '')) return false;
    return true;
  });
};

export const sortProducts = (products: Product[], sortBy: string) => {
  const sortedProducts = [...products];
  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'newest':
      return sortedProducts.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    case 'popularity':
      return sortedProducts.sort((a, b) => b.popularity - a.popularity);
    default:
      return sortedProducts;
  }
};
