import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: string;
}

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="relative">
      <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted" />
      <ol className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = steps.findIndex((s) => s.id === currentStep) > index;
          const isCurrent = step.id === currentStep;

          return (
            <li key={step.id} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "border-2 bg-background",
                  isCompleted && "bg-primary border-primary text-primary-foreground",
                  isCurrent && "border-primary",
                  !isCompleted && !isCurrent && "border-muted"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm",
                  (isCompleted || isCurrent) && "text-foreground",
                  !isCompleted && !isCurrent && "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}