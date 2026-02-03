import { ArrowLeft, Users, MapPin, Award, TrendingUp, Clock, CheckCircle2, Building, Route, RefreshCw } from 'lucide-react';
import { mockCaseDistribution } from '../../../data/underwritingMock';

interface DistributionInsightsProps {
  onPrevious: () => void;
  onRestart?: () => void;
}

const DistributionInsights = ({ onPrevious, onRestart }: DistributionInsightsProps) => {
  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Case Distribution Details
        </h2>
        <p className="text-gray-600">
          Distribution path and channel information for this case
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Submitting Agent</h3>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {mockCaseDistribution.agent.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="text-center mt-2">
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
                  {mockCaseDistribution.agent.rank}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{mockCaseDistribution.agent.name}</h4>
                  <p className="text-sm text-gray-500">{mockCaseDistribution.agent.code} • {mockCaseDistribution.agent.tenure}</p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Total Submissions</p>
                  <p className="text-xl font-bold text-gray-900">{mockCaseDistribution.agent.performance.totalSubmissions}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Approval Rate</p>
                  <p className="text-xl font-bold text-green-600">{mockCaseDistribution.agent.performance.approvalRate}%</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Avg Processing</p>
                  <p className="text-xl font-bold text-blue-600">{mockCaseDistribution.agent.performance.avgProcessingTime}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Total Premium</p>
                  <p className="text-xl font-bold text-purple-600">{mockCaseDistribution.agent.performance.totalPremium}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center space-x-2">
                <span className="text-sm text-gray-500">Specializations:</span>
                {mockCaseDistribution.agent.specializations.map((spec, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Building className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Channel Information</h3>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">{mockCaseDistribution.channel.type}</p>
                <p className="text-sm text-gray-500">{mockCaseDistribution.channel.code}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Submissions</span>
                <span className="font-semibold text-gray-900">{mockCaseDistribution.channel.performance.totalSubmissions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Approval Rate</span>
                <span className="font-semibold text-green-600">{mockCaseDistribution.channel.performance.approvalRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Market Share</span>
                <span className="font-semibold text-blue-600">{mockCaseDistribution.channel.performance.marketShare}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Premium</span>
                <span className="font-semibold text-purple-600">{mockCaseDistribution.channel.performance.totalPremium}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Geographic Information</h3>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-gray-900">{mockCaseDistribution.geographic.city}</p>
                <p className="text-sm text-gray-500">{mockCaseDistribution.geographic.region}</p>
              </div>
              <MapPin className="w-8 h-8 text-purple-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Branch</span>
                <span className="font-semibold text-gray-900">{mockCaseDistribution.geographic.branch}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Branch Code</span>
                <span className="font-mono text-sm text-gray-500">{mockCaseDistribution.geographic.branchCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Territory Rating</span>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                  {mockCaseDistribution.geographic.territoryRating}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Risk Level</span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                  {mockCaseDistribution.geographic.territoryRiskLevel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Route className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-900">Distribution Path</h3>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 to-green-500" />

            <div className="space-y-6">
              {mockCaseDistribution.distributionPath.map((step, index) => (
                <div key={index} className="relative flex items-start space-x-4">
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${
                    index === mockCaseDistribution.distributionPath.length - 1
                      ? 'bg-gradient-to-br from-green-500 to-green-600'
                      : 'bg-gradient-to-br from-amber-500 to-amber-600'
                  }`}>
                    {index === mockCaseDistribution.distributionPath.length - 1 ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>

                  <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{step.stage}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(step.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{step.source}</p>
                    {step.daysFromPrevious > 0 && (
                      <p className="text-xs text-gray-400 mt-1">+{step.daysFromPrevious} day(s) from previous</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Timeline Summary</h3>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Lead to Submission</p>
              <p className="text-2xl font-bold text-gray-900">{mockCaseDistribution.caseTimeline.leadToSubmission}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Submission to Decision</p>
              <p className="text-2xl font-bold text-green-600">{mockCaseDistribution.caseTimeline.submissionToDecision}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Total Cycle Time</p>
              <p className="text-2xl font-bold text-blue-600">{mockCaseDistribution.caseTimeline.totalCycleTime}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Industry Average</p>
              <p className="text-2xl font-bold text-gray-400">{mockCaseDistribution.caseTimeline.industryAverage}</p>
              <p className="text-xs text-green-600 mt-1">50% faster than average</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onPrevious} className="btn-secondary flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>
        <button
          onClick={handleRestart}
          className="btn-primary flex items-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Restart Demo</span>
        </button>
      </div>
    </div>
  );
};

export default DistributionInsights;
