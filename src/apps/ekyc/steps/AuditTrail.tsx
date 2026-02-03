import { ArrowLeft, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { ekycAuditTrail } from '../../../data/ekycMock';

interface AuditTrailProps {
  onPrevious: () => void;
  onRestart: () => void;
}

const AuditTrail = ({ onPrevious, onRestart }: AuditTrailProps) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Audit Trail</h2>
        <p className="text-gray-600">Session log for the eKYC journey.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="space-y-4">
          {ekycAuditTrail.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div>
                <p className="font-semibold text-gray-900">{item.action}</p>
                <p className="text-xs text-gray-500">{item.timestamp}</p>
              </div>
              <div className="flex items-center space-x-2 text-emerald-600 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span className="capitalize">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-2 text-emerald-700 font-semibold mb-2">
          <Clock className="w-5 h-5" />
          <span>End-to-end completion: 62 seconds</span>
        </div>
        <p className="text-sm text-emerald-700">
          Audit events are captured for walkthrough and stakeholder review.
        </p>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrevious} className="btn-secondary flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>
        <button onClick={onRestart} className="btn-primary flex items-center space-x-2">
          <RefreshCw className="w-5 h-5" />
          <span>Restart Demo</span>
        </button>
      </div>
    </div>
  );
};

export default AuditTrail;
