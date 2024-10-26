import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DeliveryOptionsProps {
  onNext: () => void;
  onBack: () => void;
}

const deliveryOptions = [
  {
    id: "standard",
    name: "Standard Delivery",
    price: 5.99,
    description: "Delivery within 3-5 business days",
  },
  {
    id: "express",
    name: "Express Delivery",
    price: 14.99,
    description: "Delivery within 1-2 business days",
  },
];

export function DeliveryOptions({ onNext, onBack }: DeliveryOptionsProps) {
  const [selectedOption, setSelectedOption] = useState(deliveryOptions[0].id);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Choose Delivery Method</h2>
      <RadioGroup
        value={selectedOption}
        onValueChange={setSelectedOption}
        className="space-y-4"
      >
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center space-x-4 rounded-lg border p-4"
          >
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="flex-1">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{option.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {option.description}
                  </div>
                </div>
                <div className="font-medium">${option.price.toFixed(2)}</div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Cart
        </Button>
        <Button onClick={onNext}>Continue to Information</Button>
      </div>
    </div>
  );
}