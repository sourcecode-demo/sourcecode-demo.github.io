import { useState } from 'react';
import StepIndicator from '../../components/StepIndicator';
import FaceCapture from './steps/FaceCapture';
import IdUpload from './steps/IdUpload';
import OcrExtraction from './steps/OcrExtraction';
import FaceMatch from './steps/FaceMatch';
import Decision from './steps/Decision';
import AuditTrail from './steps/AuditTrail';
import { ArrowLeftRight } from 'lucide-react';

const steps = [
  { id: 1, name: 'Face Capture', description: 'Live selfie' },
  { id: 2, name: 'ID Upload', description: 'Document intake' },
  { id: 3, name: 'OCR Extraction', description: 'Data capture' },
  { id: 4, name: 'Face Match', description: 'Biometric check' },
  { id: 5, name: 'Decision', description: 'eKYC result' },
  { id: 6, name: 'Audit Trail', description: 'Session log' }
];

interface EkycAppProps {
  onExit: () => void;
}

const EkycApp = ({ onExit }: EkycAppProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [faceCaptured, setFaceCaptured] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      let duration = 1200;
      const stages: string[] = [];
      const nextStep = currentStep + 1;

      if (currentStep === 2) {
        duration = 9000;
        stages.push('Detecting document type...');
        stages.push('Extracting text fields...');
        stages.push('Normalizing Vietnamese diacritics...');
        stages.push('Validating field consistency...');
      } else if (currentStep === 3) {
        duration = 7000;
        stages.push('Aligning face landmarks...');
        stages.push('Generating face embeddings...');
        stages.push('Computing similarity score...');
      } else if (currentStep === 4) {
        duration = 3500;
        stages.push('Aggregating signals...');
        stages.push('Generating decision reason...');
      }

      if (stages.length > 0) {
        setIsProcessing(true);
        setCurrentStep(nextStep);
        const stageInterval = duration / stages.length;
        stages.forEach((stage, index) => {
          setTimeout(() => {
            setProcessingStage(stage);
          }, stageInterval * index);
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
    setFaceCaptured(false);
    setIdUploaded(false);
    setIsProcessing(false);
    setProcessingStage('');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FaceCapture
            onNext={handleNext}
            isProcessing={isProcessing}
            faceCaptured={faceCaptured}
            onCapture={() => setFaceCaptured(true)}
          />
        );
      case 2:
        return (
          <IdUpload
            onNext={handleNext}
            onPrevious={handlePrevious}
            isProcessing={isProcessing}
            idUploaded={idUploaded}
            onUpload={() => setIdUploaded(true)}
          />
        );
      case 3:
        return (
          <OcrExtraction
            onNext={handleNext}
            onPrevious={handlePrevious}
            isProcessing={isProcessing}
            processingStage={processingStage}
          />
        );
      case 4:
        return (
          <FaceMatch
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">KY</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">eKYC Verification</h1>
                <p className="text-sm text-gray-500">Face + ID OCR demo flow</p>
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
            © 2026 eKYC Demo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EkycApp;
