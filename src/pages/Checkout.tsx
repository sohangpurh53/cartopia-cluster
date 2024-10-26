import { useState } from "react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartSummary } from "@/components/checkout/CartSummary";
import { DeliveryOptions } from "@/components/checkout/DeliveryOptions";
import { UserInformation } from "@/components/checkout/UserInformation";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import { OrderReview } from "@/components/checkout/OrderReview";
import { Steps } from "@/components/checkout/Steps";

type CheckoutStep = "cart" | "delivery" | "information" | "payment" | "review";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const cart = useCart();

  const steps = [
    { id: "cart", title: "Cart" },
    { id: "delivery", title: "Delivery" },
    { id: "information", title: "Information" },
    { id: "payment", title: "Payment" },
    { id: "review", title: "Review" },
  ];

  const handleNextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as CheckoutStep);
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as CheckoutStep);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => window.history.back()}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Steps steps={steps} currentStep={currentStep} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {currentStep === "cart" && <CartSummary onNext={handleNextStep} />}
          {currentStep === "delivery" && (
            <DeliveryOptions onNext={handleNextStep} onBack={handlePreviousStep} />
          )}
          {currentStep === "information" && (
            <UserInformation onNext={handleNextStep} onBack={handlePreviousStep} />
          )}
          {currentStep === "payment" && (
            <PaymentSection onNext={handleNextStep} onBack={handlePreviousStep} />
          )}
          {currentStep === "review" && (
            <OrderReview onBack={handlePreviousStep} />
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-muted p-6 rounded-lg sticky top-8">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;