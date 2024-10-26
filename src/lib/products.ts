export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
}

// Mock data for initial development
export const products: Product[] = [
  {
    id: "1",
    name: "Premium Leather Backpack",
    description: "Handcrafted leather backpack with multiple compartments",
    price: 199.99,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    rating: 4.5,
    stock: 10
  },
  {
    id: "2",
    name: "Minimalist Watch",
    description: "Classic design with modern features",
    price: 299.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    stock: 15
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    description: "Premium sound quality with noise cancellation",
    price: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    rating: 4.3,
    stock: 20
  }
];

export const getProducts = () => products;

export const getProductById = (id: string) => 
  products.find(product => product.id === id);

export const getProductsByCategory = (category: string) =>
  products.filter(product => product.category === category);

export const searchProducts = (query: string) =>
  products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );