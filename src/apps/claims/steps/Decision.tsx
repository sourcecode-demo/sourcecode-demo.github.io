import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { claimDecision, claimTooltips } from '../../../data/claimsMock';
import Tooltip from '../../../components/Tooltip';

interface DecisionProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  processingStage: string;
}

const Decision = ({ onNext, onPrevious, isProcessing, processingStage }: DecisionProps) => {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Claim Decision</h2>
          <p className="text-gray-600">Final payout decision with explanation and audit-ready notes.</p>
        </div>
        <Tooltip content={claimTooltips.decision} showIcon={true}>
          <div className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-full text-sm font-semibold cursor-help">
            <ShieldCheck className="w-4 h-4" />
            <span>Decision logic</span>
          </div>
        </Tooltip>
      </div>

      <div className="rounded-xl p-8 mb-8 text-white shadow-lg bg-gradient-to-r from-purple-500 to-purple-600">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle2 className="w-12 h-12" />
              <h3 className="text-4xl font-bold">{claimDecision.status}</h3>
            </div>
            <p className="text-purple-100 text-lg">{claimDecision.explanation}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-100">Approved payout</p>
            <p className="text-5xl font-bold">{claimDecision.payoutAmount}</p>
            <div className="flex items-center space-x-2 text-purple-100 justify-end mt-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{claimDecision.processingTime}</span>
            </div>
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Calculating Payout</h3>
              <p className="text-gray-600 mb-4">{processingStage || 'Finalizing decision...'}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
              <p className="text-sm text-gray-500">Decision engine (demo simulation)</p>
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
