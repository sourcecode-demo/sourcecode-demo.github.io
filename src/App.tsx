import { useState } from 'react';
import './App.css';
import StepIndicator from './components/StepIndicator';
import SubmissionIntake from './components/steps/SubmissionIntake';
import OCRResults from './components/steps/OCRResults';
import UnderwritingDecision from './components/steps/UnderwritingDecision';
import AuditTrail from './components/steps/AuditTrail';
import Analytics from './components/steps/Analytics';
import DistributionInsights from './components/steps/DistributionInsights';
import Dashboard from './components/Dashboard';
import { LayoutDashboard } from 'lucide-react';

const steps = [
  { id: 1, name: 'Submission Intake', description: 'Document Upload' },
  { id: 2, name: 'OCR Processing', description: 'Data Extraction' },
  { id: 3, name: 'Underwriting', description: 'Risk Assessment' },
  { id: 4, name: 'Audit Trail', description: 'Process History' },
  { id: 5, name: 'Analytics', description: 'Case Insights' },
  { id: 6, name: 'Distribution', description: 'Case Distribution' }
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [filesUploaded, setFilesUploaded] = useState(false);
  const [isUnhappyCase, setIsUnhappyCase] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setIsProcessing(true);
      
      // Different processing times for different steps
      let duration = 2000;
      const stages: string[] = [];
      
      if (currentStep === 1) {
        // OCR processing: 15-20 seconds
        duration = 18000;
        stages.push('Analyzing documents...');
        stages.push('Extracting text from pages...');
        stages.push('Recognizing handwritten text...');
        stages.push('Validating extracted data...');
        stages.push('Structuring information...');
      } else if (currentStep === 2) {
        // Underwriting: 15-20 seconds
        duration = 16000;
        stages.push('Loading underwriting rules...');
        stages.push('Analyzing risk factors...');
        stages.push('Checking medical history...');
        stages.push('Calculating risk score...');
        stages.push('Generating decision...');
      } else {
        duration = 1500;
      }
      
      // Simulate processing stages
      if (stages.length > 0) {
        const stageInterval = duration / stages.length;
        stages.forEach((stage, index) => {
          setTimeout(() => {
            setProcessingStage(stage);
          }, stageInterval * index);
        });
      }
      
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsProcessing(false);
        setProcessingStage('');
      }, duration);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const handleToggleCase = (unhappy: boolean) => {
    setIsUnhappyCase(unhappy);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setFilesUploaded(false);
    setIsUnhappyCase(false);
    setIsProcessing(false);
    setProcessingStage('');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SubmissionIntake 
            onNext={handleNext} 
            isProcessing={isProcessing}
            processingStage={processingStage}
            filesUploaded={filesUploaded}
            setFilesUploaded={setFilesUploaded}
            isUnhappyCase={isUnhappyCase}
            onToggleCase={handleToggleCase}
          />
        );
      case 2:
        return (
          <OCRResults 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
            isProcessing={isProcessing}
            processingStage={processingStage}
            isUnhappyCase={isUnhappyCase}
          />
        );
      case 3:
        return (
          <UnderwritingDecision 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
            isProcessing={isProcessing}
            processingStage={processingStage}
            isUnhappyCase={isUnhappyCase}
          />
        );
      case 4:
        return <AuditTrail onNext={handleNext} onPrevious={handlePrevious} isProcessing={isProcessing} />;
      case 5:
        return <Analytics onNext={handleNext} onPrevious={handlePrevious} isProcessing={isProcessing} />;
      case 6:
        return <DistributionInsights onPrevious={handlePrevious} onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">IU</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Intelligent Underwriting</h1>
                <p className="text-sm text-gray-500">AI-Powered Insurance Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dashboard Button */}
              <button
                onClick={() => setShowDashboard(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <StepIndicator 
          steps={steps} 
          currentStep={currentStep} 
          onStepClick={handleStepClick}
        />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {renderStep()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2026 Intelligent Underwriting Platform - Demo Version
          </p>
        </div>
      </footer>

      {/* Dashboard Modal */}
      {showDashboard && (
        <Dashboard onClose={() => setShowDashboard(false)} />
      )}
    </div>
  );
}

export default App;
