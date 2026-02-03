import { useState } from 'react';
import StepIndicator from '../../components/StepIndicator';
import ClaimUpload from './steps/ClaimUpload';
import OcrExtraction from './steps/OcrExtraction';
import PolicyLookup from './steps/PolicyLookup';
import AiMapping from './steps/AiMapping';
import Decision from './steps/Decision';
import AuditTrail from './steps/AuditTrail';
import { ArrowLeftRight } from 'lucide-react';

const steps = [
  { id: 1, name: 'Upload Docs', description: 'Claim intake' },
  { id: 2, name: 'OCR Extraction', description: 'Data capture' },
  { id: 3, name: 'Policy Lookup', description: 'Coverage check' },
  { id: 4, name: 'AI Mapping', description: 'Eligibility' },
  { id: 5, name: 'Decision', description: 'Payout' },
  { id: 6, name: 'Audit Trail', description: 'Case log' }
];

interface ClaimsAppProps {
  onExit: () => void;
}

const ClaimsApp = ({ onExit }: ClaimsAppProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [documentsUploaded, setDocumentsUploaded] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      let duration = 1200;
      const stages: string[] = [];
      const nextStep = currentStep + 1;

      if (currentStep === 1) {
        duration = 10000;
        stages.push('Detecting document types...');
        stages.push('Extracting medical terms...');
        stages.push('Extracting billing amounts...');
        stages.push('Structuring claim data...');
      } else if (currentStep === 2) {
        duration = 5000;
        stages.push('Retrieving policy rules...');
        stages.push('Validating coverage limits...');
      } else if (currentStep === 3) {
        duration = 6000;
        stages.push('Mapping diagnosis to benefits...');
        stages.push('Applying co-pay rules...');
        stages.push('Generating eligibility summary...');
      } else if (currentStep === 4) {
        duration = 3500;
        stages.push('Calculating payout...');
        stages.push('Generating decision explanation...');
      }

      if (stages.length > 0) {
        setIsProcessing(true);
        setCurrentStep(nextStep);
        const stageInterval = duration / stages.length;
        stages.forEach((stage, index) => {
          setTimeout(() => setProcessingStage(stage), stageInterval * index);
        });
        setTimeout(() => {
          setIsProcessing(false);
          setProcessingStage('');
        }, duration);
      } else {
        setCurrentStep(nextStep);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setDocumentsUploaded(false);
    setIsProcessing(false);
    setProcessingStage('');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ClaimUpload
            onNext={handleNext}
            isProcessing={isProcessing}
            documentsUploaded={documentsUploaded}
            onUpload={() => setDocumentsUploaded(true)}
          />
        );
      case 2:
        return (
          <OcrExtraction
            onNext={handleNext}
            onPrevious={handlePrevious}
            isProcessing={isProcessing}
            processingStage={processingStage}
          />
        );
      case 3:
        return (
          <PolicyLookup
            onNext={handleNext}
            onPrevious={handlePrevious}
            isProcessing={isProcessing}
            processingStage={processingStage}
          />
        );
      case 4:
        return (
          <AiMapping
            onNext={handleNext}
            onPrevious={handlePrevious}
            isProcessing={isProcessing}
            processingStage={processingStage}
          />
        );
      case 5:
        return (
          <Decision
            onNext={handleNext}
            onPrevious={handlePrevious}
            isProcessing={isProcessing}
            processingStage={processingStage}
          />
        );
      case 6:
        return <AuditTrail onPrevious={handlePrevious} onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CL</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Claims Automation</h1>
                <p className="text-sm text-gray-500">Claims OCR + policy mapping</p>
              </div>
            </div>
            <button
              onClick={onExit}
              className="flex items-center space-x-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Switch App</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <StepIndicator steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          {renderStep()}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2026 Claims Demo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ClaimsApp;
