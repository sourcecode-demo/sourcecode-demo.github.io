import { ArrowRight, ArrowLeft, CheckCircle2, Shield, TrendingUp, Clock, Award, AlertCircle } from 'lucide-react';
import { mockUnderwritingDecision } from '../../data/mockData';

interface UnderwritingDecisionProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  processingStage: string;
}

const UnderwritingDecision = ({ onNext, onPrevious, isProcessing }: UnderwritingDecisionProps) => {
  // processingStage can be used here if needed for future enhancements
  const getRiskColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-blue-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Underwriting Decision
        </h2>
        <p className="text-gray-600">
          Automated risk assessment and policy decision
        </p>
      </div>

      {/* Decision Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 mb-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle2 className="w-12 h-12" />
              <h3 className="text-4xl font-bold">{mockUnderwritingDecision.decision}</h3>
            </div>
            <p className="text-green-100 text-lg mb-4">
              Risk Rating: <span className="font-semibold">{mockUnderwritingDecision.riskRating}</span>
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Processed in {mockUnderwritingDecision.processingTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span className="text-sm">Auto-Approved</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-100 text-sm mb-2">Premium Amount</p>
            <p className="text-5xl font-bold">{mockUnderwritingDecision.premium}</p>
            <p className="text-green-100 text-sm mt-2">Annual Payment</p>
          </div>
        </div>
      </div>

      {/* Overall Risk Score */}
      <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Overall Risk Score</h3>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Low Risk</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-end pr-4"
                style={{ width: `${mockUnderwritingDecision.overallRiskScore}%` }}
              >
                <span className="text-white font-bold text-sm">
                  {mockUnderwritingDecision.overallRiskScore}
                </span>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {mockUnderwritingDecision.overallRiskScore}/100
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factor Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          {mockUnderwritingDecision.riskFactors.map((factor, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{factor.factor}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskBgColor(
                    factor.score
                  )} ${getRiskColor(factor.score)}`}
                >
                  {factor.impact}
                </span>
              </div>
              <div className="mb-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      factor.score >= 90
                        ? 'bg-green-500'
                        : factor.score >= 75
                        ? 'bg-blue-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{factor.details}</p>
              <p className={`text-lg font-bold ${getRiskColor(factor.score)}`}>
                Score: {factor.score}/100
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Underwriting Rules Applied */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Underwriting Rules Applied ({mockUnderwritingDecision.rulesApplied.length})
          </h3>
        </div>
        <div className="space-y-3">
          {mockUnderwritingDecision.rulesApplied.map((rule, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xs font-mono bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {rule.ruleId}
                    </span>
                    <h4 className="font-semibold text-gray-900">{rule.ruleName}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-600">{rule.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 mb-2">Recommended Action</h4>
            <p className="text-blue-800 mb-3">{mockUnderwritingDecision.recommendedAction}</p>
            <div className="flex items-center space-x-4 text-sm text-blue-700">
              <span>Approved by: {mockUnderwritingDecision.approvedBy}</span>
              <span>•</span>
              <span>Date: {new Date(mockUnderwritingDecision.approvedDate).toLocaleString()}</span>
            </div>
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
          <span>View Audit Trail</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UnderwritingDecision;
