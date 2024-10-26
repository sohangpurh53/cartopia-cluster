import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-accent">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-muted-foreground hover:text-accent">All Products</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-accent">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-muted-foreground hover:text-accent">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-accent">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-accent">Facebook</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};