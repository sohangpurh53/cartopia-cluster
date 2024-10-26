import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/cart/CartSheet";

export const Navbar = () => {
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
            <CartSheet />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};