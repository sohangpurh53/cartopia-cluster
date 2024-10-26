import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/lib/products";

const Home = () => {
  const products = getProducts();

  return (
    <div className="container py-12">
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to Store</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Discover our curated collection of premium products
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;