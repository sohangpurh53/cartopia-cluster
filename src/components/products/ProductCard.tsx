import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const cart = useCart();

  const handleAddToCart = () => {
    cart.addItem(product);
    toast.success("Added to cart");
  };

  return (
    <div className="card group animate-enter">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-lg mb-2 hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4">
          {product.description.slice(0, 100)}...
        </p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          <Button onClick={handleAddToCart} variant="secondary">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};