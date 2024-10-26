import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CartSummaryProps {
  onNext: () => void;
}

export function CartSummary({ onNext }: CartSummaryProps) {
  const cart = useCart();

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    cart.updateQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    cart.removeItem(productId);
    toast.success("Item removed from cart");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Shopping Cart</h2>
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-card rounded-lg"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1 space-y-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">${item.price}</p>
            </div>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="w-20"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={onNext} className="w-full md:w-auto">
          Continue to Delivery
        </Button>
      </div>
    </div>
  );
}