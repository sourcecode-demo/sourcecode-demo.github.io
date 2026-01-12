import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

const StepIndicator = ({ steps, currentStep, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center flex-1">
          {/* Step Circle */}
          <button
            onClick={() => onStepClick(step.id)}
            className={`flex flex-col items-center group cursor-pointer transition-all ${
              index === 0 ? '' : 'flex-1'
            }`}
          >
            <div className="flex items-center mb-2">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all
                  ${
                    step.id < currentStep
                      ? 'bg-green-500 text-white shadow-lg'
                      : step.id === currentStep
                      ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-200'
                      : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                  }`}
              >
                {step.id < currentStep ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.id
                )}
              </div>
            </div>
            <div className="text-center">
              <p
                className={`text-sm font-medium transition-colors ${
                  step.id === currentStep
                    ? 'text-blue-600'
                    : step.id < currentStep
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}
              >
                {step.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">{step.description}</p>
            </div>
          </button>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div className="flex-1 h-1 mx-4 mb-8">
              <div
                className={`h-full rounded transition-colors ${
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
