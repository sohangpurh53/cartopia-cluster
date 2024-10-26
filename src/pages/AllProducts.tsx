import { useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { getProducts, filterProducts, sortProducts } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { Filters } from "@/components/filters/Filters";

const AllProducts = () => {
  const allProducts = getProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("");

  const filteredProducts = filterProducts(allProducts, filters)
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedProducts = sortProducts(filteredProducts, sortBy);

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <Filters
            onFilterChange={setFilters}
            onSortChange={setSortBy}
          />
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
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {sortedProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No products found matching your criteria
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllProducts;