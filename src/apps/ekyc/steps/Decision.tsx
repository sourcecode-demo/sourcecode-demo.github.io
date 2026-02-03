import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Clock, ShieldCheck } from 'lucide-react';
import { ekycDecision, ekycTooltips } from '../../../data/ekycMock';
import Tooltip from '../../../components/Tooltip';

interface DecisionProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  processingStage: string;
}

const Decision = ({ onNext, onPrevious, isProcessing, processingStage }: DecisionProps) => {
  const isApproved = ekycDecision.status === 'Approved';

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">eKYC Decision</h2>
          <p className="text-gray-600">Final decision based on OCR + biometrics + liveness.</p>
        </div>
        <Tooltip content={ekycTooltips.decision} showIcon={true}>
          <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-full text-sm font-semibold cursor-help">
            <ShieldCheck className="w-4 h-4" />
            <span>Decision logic</span>
          </div>
        </Tooltip>
      </div>

      <div className={`rounded-xl p-8 mb-8 text-white shadow-lg ${
        isApproved ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-gradient-to-r from-amber-500 to-amber-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              {isApproved ? (
                <CheckCircle2 className="w-12 h-12" />
              ) : (
                <AlertTriangle className="w-12 h-12" />
              )}
              <h3 className="text-4xl font-bold">{ekycDecision.status}</h3>
            </div>
            <p className={`text-lg ${isApproved ? 'text-emerald-100' : 'text-amber-100'}`}>
              {ekycDecision.decisionReason}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-white">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Processed in {ekycDecision.processingTime}</span>
            </div>
            <p className="text-sm mt-2">Review required: {ekycDecision.reviewRequired ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Decision Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Risk flags</p>
            <p className="font-semibold text-gray-900">{ekycDecision.riskFlags.join(', ')}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Decision status</p>
            <p className="font-semibold text-gray-900">{ekycDecision.status}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Review required</p>
            <p className="font-semibold text-gray-900">{ekycDecision.reviewRequired ? 'Manual review' : 'Auto-approved'}</p>
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Generating Decision</h3>
              <p className="text-gray-600 mb-4">{processingStage || 'Finalizing decision...'}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-emerald-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
              <p className="text-sm text-gray-500">Decision engine running (demo)</p>
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
          <span>View Audit Trail</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Decision;
