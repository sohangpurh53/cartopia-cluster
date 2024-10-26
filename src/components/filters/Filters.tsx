import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FiltersProps {
  onFilterChange: (filters: any) => void;
  onSortChange: (sortBy: string) => void;
}

export const Filters = ({ onFilterChange, onSortChange }: FiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const handleFilterChange = () => {
    onFilterChange({
      categories: selectedCategories,
      priceRange: { min: priceRange[0], max: priceRange[1] },
      brands: selectedBrands,
      rating: selectedRating,
      materials: selectedMaterials,
    });
  };

  const categories = ["Door Locks", "Cameras", "Handles", "Appliances"];
  const brands = ["Rehau", "Qubo", "Tagus"];
  const materials = ["Stainless Steel", "Aluminum", "ABS Plastic"];

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <Label>Sort By</Label>
        <Select onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="popularity">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      const newCategories = checked
                        ? [...selectedCategories, category]
                        : selectedCategories.filter((c) => c !== category);
                      setSelectedCategories(newCategories);
                      handleFilterChange();
                    }}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              onValueChange={(value) => {
                setPriceRange(value);
                handleFilterChange();
              }}
            />
            <div className="flex justify-between mt-2 text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => {
                      const newBrands = checked
                        ? [...selectedBrands, brand]
                        : selectedBrands.filter((b) => b !== brand);
                      setSelectedBrands(newBrands);
                      handleFilterChange();
                    }}
                  />
                  <label htmlFor={brand}>{brand}</label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              onValueChange={(value) => {
                setSelectedRating(Number(value));
                handleFilterChange();
              }}
            >
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`}>{rating}+ Stars</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="materials">
          <AccordionTrigger>Materials</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {materials.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <Checkbox
                    id={material}
                    checked={selectedMaterials.includes(material)}
                    onCheckedChange={(checked) => {
                      const newMaterials = checked
                        ? [...selectedMaterials, material]
                        : selectedMaterials.filter((m) => m !== material);
                      setSelectedMaterials(newMaterials);
                      handleFilterChange();
                    }}
                  />
                  <label htmlFor={material}>{material}</label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};