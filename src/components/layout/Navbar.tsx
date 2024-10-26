import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

export const Navbar = () => {
  const cart = useCart();
  const itemCount = cart.items.length;

  return (
    <nav className="border-b">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Store
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-sm font-medium hover:text-accent">
              All Products
            </Link>
            <Link to="/categories" className="text-sm font-medium hover:text-accent">
              Categories
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-accent">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};