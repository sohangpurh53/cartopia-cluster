import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export const Filters = () => {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold mb-4">Filters</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <Slider defaultValue={[0, 1000]} max={1000} step={1} />
            <div className="flex justify-between mt-2">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="electronics" />
                <label htmlFor="electronics">Electronics</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="clothing" />
                <label htmlFor="clothing">Clothing</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="books" />
                <label htmlFor="books">Books</label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};