import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/lib/products";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Filters } from "@/components/filters/Filters";

const AllProducts = () => {
  const products = getProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <Filters />
        </aside>
        <main className="flex-1">
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllProducts;