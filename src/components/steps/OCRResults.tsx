import { ArrowRight, ArrowLeft, User, Phone, Shield, Users, Heart, CheckCircle2, Sparkles, AlertTriangle } from 'lucide-react';
import { mockOCRResults, mockUnhappyOCRResults } from '../../data/mockData';
import Tooltip from '../Tooltip';

interface OCRResultsProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  processingStage: string;
  isUnhappyCase?: boolean;
}

const OCRResults = ({ onNext, onPrevious, isProcessing, processingStage, isUnhappyCase = false }: OCRResultsProps) => {
  const ocrData = isUnhappyCase ? mockUnhappyOCRResults : mockOCRResults;
  
  return (
    <div className="p-8 relative">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              OCR Processing Results
            </h2>
            <p className="text-gray-600">
              Data extracted and validated from application documents
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Case Type Indicator */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              isUnhappyCase ? 'bg-red-100' : 'bg-green-100'
            }`}>
              {isUnhappyCase ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-700">Unhappy Case</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-700">Happy Case</span>
                </>
              )}
            </div>
            
            {/* Confidence Score with Tooltip */}
            <Tooltip content={ocrData.confidenceExplanation}>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                isUnhappyCase ? 'bg-yellow-100' : 'bg-green-100'
              }`}>
                <Sparkles className={`w-5 h-5 ${isUnhappyCase ? 'text-yellow-600' : 'text-green-600'}`} />
                <span className={`font-semibold ${isUnhappyCase ? 'text-yellow-700' : 'text-green-700'}`}>
                  {ocrData.confidence}% Confidence
                </span>
              </div>
            </Tooltip>
          </div>
        </div>
        
        {/* Unhappy Case Warning Banner */}
        {isUnhappyCase && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800">Unhappy Case Demo</h4>
              <p className="text-sm text-red-600">
                This demonstrates how the system handles cases that may not meet underwriting criteria. 
                The applicant has multiple risk factors that will be evaluated in the underwriting step.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-6 border border-gray-200">
          {Object.entries(ocrData.personalInfo).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-sm font-semibold text-gray-900">{String(value)}</p>
              <div className="mt-2 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Phone className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 bg-gray-50 rounded-lg p-6 border border-gray-200">
          {Object.entries(ocrData.contactInfo).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-sm font-semibold text-gray-900">{value}</p>
              <div className="mt-2 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Details */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Policy Details
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 bg-blue-50 rounded-lg p-6 border border-blue-200">
          {Object.entries(ocrData.policyDetails).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-sm font-semibold text-gray-900">{value}</p>
              <div className="mt-2 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Beneficiaries */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Beneficiaries</h3>
          <Tooltip content={ocrData.beneficiaryShareExplanation} showIcon={true}>
            <span></span>
          </Tooltip>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {ocrData.beneficiaries.map((beneficiary, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900">{beneficiary.name}</p>
                <Tooltip 
                  content={`This beneficiary receives ${beneficiary.share} of the policy benefits as designated by the applicant.`}
                  showIcon={false}
                >
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium cursor-help">
                    {beneficiary.share}
                  </span>
                </Tooltip>
              </div>
              <p className="text-sm text-gray-600">{beneficiary.relationship}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Health Declaration */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Heart className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Health Declaration
          </h3>
        </div>
        <div className={`grid grid-cols-2 gap-4 rounded-lg p-6 border ${
          isUnhappyCase 
            ? 'bg-red-50 border-red-200' 
            : 'bg-green-50 border-green-200'
        }`}>
          {Object.entries(ocrData.healthDeclaration).map(
            ([key, value]) => (
              <div key={key} className="bg-white rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className={`text-sm font-semibold ${
                  isUnhappyCase && value !== 'None' && !value.includes('None') 
                    ? 'text-red-700' 
                    : 'text-gray-900'
                }`}>
                  {value}
                </p>
                <div className="mt-2 flex items-center space-x-1">
                  {isUnhappyCase && value !== 'None' && !value.includes('None') ? (
                    <>
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-amber-600">Flagged for Review</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">Verified</span>
                    </>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Running Underwriting Rules
              </h3>
              <p className="text-gray-600 mb-4">
                {processingStage || 'Initializing underwriting engine...'}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }} />
              </div>
              <p className="text-sm text-gray-500">
                Analyzing risk factors and compliance rules
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button onClick={onPrevious} className="btn-secondary flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>
        <button
          onClick={onNext}
          disabled={isProcessing}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Run Underwriting</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default OCRResults;
