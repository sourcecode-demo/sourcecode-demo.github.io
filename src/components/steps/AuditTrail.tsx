import { ArrowRight, ArrowLeft, Clock, CheckCircle2, FileText, Cpu, Shield, UserCheck } from 'lucide-react';
import { mockAuditTrail } from '../../data/mockData';

interface AuditTrailProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
}

const AuditTrail = ({ onNext, onPrevious, isProcessing }: AuditTrailProps) => {
  const getActionIcon = (action: string) => {
    if (action.includes('Submission')) return <FileText className="w-5 h-5" />;
    if (action.includes('OCR')) return <Cpu className="w-5 h-5" />;
    if (action.includes('Underwriting')) return <Shield className="w-5 h-5" />;
    if (action.includes('Quality') || action.includes('Issued')) return <UserCheck className="w-5 h-5" />;
    return <CheckCircle2 className="w-5 h-5" />;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Audit Trail
        </h2>
        <p className="text-gray-600">
          Complete history of all actions and decisions
        </p>
      </div>

      {/* Timeline Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
          <p className="text-sm text-blue-600 mb-1">Total Steps</p>
          <p className="text-3xl font-bold text-blue-700">{mockAuditTrail.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border border-green-200">
          <p className="text-sm text-green-600 mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-700">{mockAuditTrail.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 border border-purple-200">
          <p className="text-sm text-purple-600 mb-1">Auto Actions</p>
          <p className="text-3xl font-bold text-purple-700">5</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-5 border border-orange-200">
          <p className="text-sm text-orange-600 mb-1">Total Duration</p>
          <p className="text-3xl font-bold text-orange-700">6min</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Process Timeline</h3>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-green-600" />

          {/* Timeline Items */}
          <div className="space-y-6">
            {mockAuditTrail.map((item, index) => {
              const { time, date } = formatTimestamp(item.timestamp);
              return (
                <div key={index} className="relative flex items-start space-x-4">
                  {/* Timeline Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ring-blue-100">
                      {getActionIcon(item.action)}
                    </div>
                  </div>

                  {/* Timeline Content */}
                  <div className="flex-1 bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{item.action}</h4>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-green-600 capitalize">
                          {item.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{item.details}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{time}</span>
                        </div>
                        <span className="text-sm text-gray-400">{date}</span>
                      </div>
                      <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {item.user}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process Summary */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
        <h4 className="font-semibold text-green-900 mb-3">Process Summary</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Start Time</p>
            <p className="text-lg font-bold text-gray-900">10:30:00 AM</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">End Time</p>
            <p className="text-lg font-bold text-gray-900">10:36:00 AM</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Duration</p>
            <p className="text-lg font-bold text-green-600">6 minutes</p>
          </div>
        </div>
      </div>

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
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>View Analytics</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AuditTrail;
