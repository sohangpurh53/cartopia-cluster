import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface OrderReviewProps {
  onBack: () => void;
}

export function OrderReview({ onBack }: OrderReviewProps) {
  const cart = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Here you would typically make an API call to process the order
    toast.success("Order placed successfully!");
    cart.clearCart();
    navigate("/order-confirmation");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Review Your Order</h2>
      
      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Items</h3>
          <div className="space-y-2">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Shipping</h3>
          <p className="text-sm text-muted-foreground">
            Standard Delivery (3-5 business days)
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Payment</h3>
          <p className="text-sm text-muted-foreground">
            Credit Card ending in 3456
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${(cart.total * 0.1).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${(cart.total + 5.99 + cart.total * 0.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Payment
        </Button>
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    </div>
  );
}