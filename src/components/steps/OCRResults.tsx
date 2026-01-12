import { ArrowRight, ArrowLeft, User, Phone, Shield, Users, Heart, CheckCircle2, Sparkles } from 'lucide-react';
import { mockOCRResults } from '../../data/mockData';

interface OCRResultsProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  processingStage: string;
}

const OCRResults = ({ onNext, onPrevious, isProcessing, processingStage }: OCRResultsProps) => {
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
          <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
            <Sparkles className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-700">
              {mockOCRResults.confidence}% Confidence
            </span>
          </div>
        </div>
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
          {Object.entries(mockOCRResults.personalInfo).map(([key, value]) => (
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

      {/* Contact Information */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Phone className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 bg-gray-50 rounded-lg p-6 border border-gray-200">
          {Object.entries(mockOCRResults.contactInfo).map(([key, value]) => (
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
          {Object.entries(mockOCRResults.policyDetails).map(([key, value]) => (
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          {mockOCRResults.beneficiaries.map((beneficiary, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900">{beneficiary.name}</p>
                <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                  {beneficiary.share}
                </span>
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
        <div className="grid grid-cols-2 gap-4 bg-green-50 rounded-lg p-6 border border-green-200">
          {Object.entries(mockOCRResults.healthDeclaration).map(
            ([key, value]) => (
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
