import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { claimEligibility, claimTooltips } from '../../../data/claimsMock';
import Tooltip from '../../../components/Tooltip';

interface AiMappingProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  processingStage: string;
}

const AiMapping = ({ onNext, onPrevious, isProcessing, processingStage }: AiMappingProps) => {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Mapping to Benefits</h2>
          <p className="text-gray-600">
            Map extracted medical data to coverage rules with explainable output.
          </p>
        </div>
        <Tooltip content={claimTooltips.mapping} showIcon={true}>
          <div className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-full text-sm font-semibold cursor-help">
            <Sparkles className="w-4 h-4" />
            <span>AI mapping</span>
          </div>
        </Tooltip>
      </div>

      <div className="space-y-4 mb-8">
        {claimEligibility.map((item, index) => (
          <div key={index} className={`border rounded-lg p-5 ${
            item.eligible ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{item.benefit}</h4>
                <p className="text-sm text-gray-600">{item.rule}</p>
                <p className="text-sm text-gray-700 mt-2">
                  Applied amount: <span className="font-semibold">{item.appliedAmount}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {item.eligible ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`text-sm font-semibold ${item.eligible ? 'text-emerald-700' : 'text-red-700'}`}>
                  {item.eligible ? 'Eligible' : 'Not eligible'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mapping Benefits</h3>
              <p className="text-gray-600 mb-4">{processingStage || 'Matching coverage rules...'}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
              <p className="text-sm text-gray-500">Benefit mapping (demo simulation)</p>
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
          <span>Generate Decision</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AiMapping;
