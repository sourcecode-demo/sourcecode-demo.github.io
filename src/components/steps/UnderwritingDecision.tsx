import { ArrowRight, ArrowLeft, CheckCircle2, Shield, TrendingUp, Clock, Award, AlertCircle, XCircle, Info } from 'lucide-react';
import { mockUnderwritingDecision, mockUnhappyUnderwritingDecision } from '../../data/mockData';
import Tooltip from '../Tooltip';

interface UnderwritingDecisionProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  processingStage: string;
  isUnhappyCase?: boolean;
}

const UnderwritingDecision = ({ onNext, onPrevious, isProcessing, isUnhappyCase = false }: UnderwritingDecisionProps) => {
  const decision = isUnhappyCase ? mockUnhappyUnderwritingDecision : mockUnderwritingDecision;
  const isDeclined = decision.decision === "Declined";
  
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

  const getResultIcon = (result: string) => {
    if (result === "PASS") {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getResultColor = (result: string) => {
    return result === "PASS" ? "text-green-600" : "text-red-600";
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
      <div className={`rounded-xl p-8 mb-8 text-white shadow-lg ${
        isDeclined 
          ? 'bg-gradient-to-r from-red-500 to-red-600' 
          : 'bg-gradient-to-r from-green-500 to-green-600'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              {isDeclined ? (
                <XCircle className="w-12 h-12" />
              ) : (
                <CheckCircle2 className="w-12 h-12" />
              )}
              <h3 className="text-4xl font-bold">{decision.decision}</h3>
            </div>
            <p className={`text-lg mb-4 ${isDeclined ? 'text-red-100' : 'text-green-100'}`}>
              Risk Rating: <span className="font-semibold">{decision.riskRating}</span>
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Processed in {decision.processingTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span className="text-sm">{isDeclined ? 'Auto-Declined' : 'Auto-Approved'}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm mb-2 ${isDeclined ? 'text-red-100' : 'text-green-100'}`}>
              {isDeclined ? 'Premium Amount' : 'Premium Amount'}
            </p>
            <p className="text-5xl font-bold">{decision.premium}</p>
            {!isDeclined && (
              <p className="text-green-100 text-sm mt-2">Annual Payment</p>
            )}
          </div>
        </div>
      </div>

      {/* Decline Reasons (for unhappy case) */}
      {isDeclined && 'declineReasons' in decision && (
        <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-900 mb-3">Decline Reasons</h4>
              <ul className="space-y-2">
                {decision.declineReasons.map((reason: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-red-800">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Overall Risk Score */}
      <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Overall Risk Score</h3>
          <div className="flex items-center space-x-2">
            <TrendingUp className={`w-5 h-5 ${isDeclined ? 'text-red-600' : 'text-green-600'}`} />
            <span className={`text-sm font-medium ${isDeclined ? 'text-red-600' : 'text-green-600'}`}>
              {isDeclined ? 'High Risk' : 'Low Risk'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full flex items-center justify-end pr-4 ${
                  decision.overallRiskScore >= 75 
                    ? 'bg-gradient-to-r from-green-400 to-green-600' 
                    : decision.overallRiskScore >= 50
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                    : 'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{ width: `${decision.overallRiskScore}%` }}
              >
                <span className="text-white font-bold text-sm">
                  {decision.overallRiskScore}
                </span>
              </div>
            </div>
          </div>
          <div className={`text-3xl font-bold ${getRiskColor(decision.overallRiskScore)}`}>
            {decision.overallRiskScore}/100
          </div>
        </div>
      </div>

      {/* Risk Rating Explanation */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Info className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Risk Rating Explanation</h3>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-700 mb-4">{decision.riskRatingDetails.explanation}</p>
          
          {/* Risk Rating Scale */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Risk Rating Scale</h4>
            <div className="grid grid-cols-4 gap-3">
              {decision.riskRatingDetails.scale.map((level, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border-2 ${
                    level.level === decision.riskRating 
                      ? level.level === 'Declined' || level.level === 'High Risk'
                        ? 'border-red-500 bg-red-50'
                        : level.level === 'Sub-standard'
                        ? 'border-yellow-500 bg-yellow-50'
                        : level.level === 'Standard'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <p className={`font-semibold text-sm ${
                    level.level === decision.riskRating ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {level.level}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{level.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Score: {level.scoreRange}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Product Eligibility */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Product Eligibility</h4>
            <div className="grid grid-cols-2 gap-3">
              {decision.riskRatingDetails.productEligibility.map((product, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${
                    product.eligible 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Tooltip content={product.fullName} showIcon={false}>
                        <span className="font-semibold text-gray-900 cursor-help">{product.type}</span>
                      </Tooltip>
                    </div>
                    {product.eligible ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{product.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factor Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          {decision.riskFactors.map((factor, index) => (
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
                        : factor.score >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
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
            Underwriting Rules Applied ({decision.rulesApplied.length})
          </h3>
        </div>
        <div className="space-y-3">
          {decision.rulesApplied.map((rule, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 hover:shadow-sm transition-colors ${
                rule.result === "PASS" 
                  ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' 
                  : 'bg-red-50 border-red-200 hover:bg-red-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      rule.result === "PASS" 
                        ? 'bg-gray-200 text-gray-700' 
                        : 'bg-red-200 text-red-700'
                    }`}>
                      {rule.ruleId}
                    </span>
                    <h4 className="font-semibold text-gray-900">{rule.ruleName}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {getResultIcon(rule.result)}
                  <span className={`font-semibold ${getResultColor(rule.result)}`}>
                    {rule.result}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className={`mb-8 border rounded-lg p-6 ${
        isDeclined 
          ? 'bg-red-50 border-red-200' 
          : 'bg-blue-50 border-blue-200'
      }`}>
        <div className="flex items-start space-x-3">
          <AlertCircle className={`w-6 h-6 mt-1 ${isDeclined ? 'text-red-600' : 'text-blue-600'}`} />
          <div className="flex-1">
            <h4 className={`font-semibold mb-2 ${isDeclined ? 'text-red-900' : 'text-blue-900'}`}>
              Recommended Action
            </h4>
            <p className={`mb-3 ${isDeclined ? 'text-red-800' : 'text-blue-800'}`}>
              {decision.recommendedAction}
            </p>
            <div className={`flex items-center space-x-4 text-sm ${
              isDeclined ? 'text-red-700' : 'text-blue-700'
            }`}>
              <span>
                {isDeclined ? 'Reviewed by' : 'Approved by'}: {
                  isDeclined && 'reviewedBy' in decision 
                    ? decision.reviewedBy 
                    : 'approvedBy' in decision 
                    ? decision.approvedBy 
                    : 'System'
                }
              </span>
              <span>•</span>
              <span>
                Date: {new Date(
                  isDeclined && 'reviewedDate' in decision 
                    ? decision.reviewedDate 
                    : 'approvedDate' in decision 
                    ? decision.approvedDate 
                    : new Date().toISOString()
                ).toLocaleString()}
              </span>
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
