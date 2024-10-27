import { useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { Share2, Heart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/ProductCard";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="container py-12">Product not found</div>;
  }

  const handleAddToCart = () => {
    cart.addItem({ ...product, quantity });
    toast.success("Added to cart");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist");
  };

  const relatedProducts = getRelatedProducts(product.category);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Carousel className="w-full">
            <CarouselContent>
              {[product.image, ...product.additionalImages || []].map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative">
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground">{product.description}</p>
            <p className="text-sm">
              Stock: <span className="font-medium">{product.stock} units</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-3 py-2 border rounded-md"
            />
            <Button onClick={handleAddToCart} className="flex-1">
              Add to Cart
            </Button>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={handleAddToWishlist}>
              <Heart className="mr-2 h-4 w-4" />
              Add to Wishlist
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Specifications</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {product.features.material && (
                <div>
                  <span className="font-medium">Material:</span> {product.features.material}
                </div>
              )}
              {product.features.dimensions && (
                <div>
                  <span className="font-medium">Dimensions:</span>{" "}
                  {product.features.dimensions}
                </div>
              )}
              {product.features.technicalSpecs?.map((spec, index) => (
                <div key={index}>{spec}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;