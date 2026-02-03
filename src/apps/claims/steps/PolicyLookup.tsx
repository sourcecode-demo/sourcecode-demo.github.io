import { ArrowLeft, ArrowRight, ShieldCheck, FileSearch } from 'lucide-react';
import { claimPolicy, claimTooltips } from '../../../data/claimsMock';
import Tooltip from '../../../components/Tooltip';

interface PolicyLookupProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  processingStage: string;
}

const PolicyLookup = ({ onNext, onPrevious, isProcessing, processingStage }: PolicyLookupProps) => {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Policy & Benefit Lookup</h2>
          <p className="text-gray-600">
            Match extracted claim data with policy coverage rules.
          </p>
        </div>
        <Tooltip content={claimTooltips.policy} showIcon={true}>
          <div className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-full text-sm font-semibold cursor-help">
            <FileSearch className="w-4 h-4" />
            <span>Policy lookup</span>
          </div>
        </Tooltip>
      </div>

      <div className="border border-gray-200 rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Policy Summary</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Policy Number</p>
            <p className="font-semibold text-gray-900">{claimPolicy.policyNumber}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Plan</p>
            <p className="font-semibold text-gray-900">{claimPolicy.plan}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Coverage Limit</p>
            <p className="font-semibold text-gray-900">{claimPolicy.coverageLimit}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-purple-500 mb-1">Deductible</p>
            <p className="font-semibold text-gray-900">{claimPolicy.deductible}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-purple-500 mb-1">Benefits</p>
            <div className="space-y-2">
              {claimPolicy.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-between text-sm text-gray-700">
                  <span>{benefit.name}</span>
                  <span className="font-semibold">{benefit.limit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Looking up Policy</h3>
              <p className="text-gray-600 mb-4">{processingStage || 'Retrieving rules...'}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }} />
              </div>
              <p className="text-sm text-gray-500">Policy service (demo simulation)</p>
            </div>
          </div>
        </div>
      )}

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
          <span>Run AI Mapping</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PolicyLookup;
