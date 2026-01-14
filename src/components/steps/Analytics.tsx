import { ArrowRight, ArrowLeft, TrendingUp, Database, Award, Clock, CheckCircle2, BarChart3, Target, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from 'recharts';
import { mockCaseAnalytics } from '../../data/mockData';

interface AnalyticsProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
}

const Analytics = ({ onNext, onPrevious, isProcessing }: AnalyticsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const comparisonData = [
    { name: 'This Case', score: mockCaseAnalytics.scoringComparison.caseScore, fill: '#10b981' },
    { name: 'Average', score: mockCaseAnalytics.scoringComparison.averageScore, fill: '#6b7280' },
    { name: 'Median', score: mockCaseAnalytics.scoringComparison.medianScore, fill: '#9ca3af' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Case Analytics
        </h2>
        <p className="text-gray-600">
          Detailed analysis and insights for this specific case
        </p>
      </div>

      {/* Data Source Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Data Source</h3>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Channel</p>
              <p className="text-lg font-bold text-blue-600">{mockCaseAnalytics.dataSource.channel}</p>
              <p className="text-xs text-gray-400">{mockCaseAnalytics.dataSource.channelCode}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Agent</p>
              <p className="text-lg font-bold text-gray-900">{mockCaseAnalytics.dataSource.agent}</p>
              <p className="text-xs text-gray-400">{mockCaseAnalytics.dataSource.agentCode}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Branch</p>
              <p className="text-lg font-bold text-gray-900">{mockCaseAnalytics.dataSource.branch}</p>
              <p className="text-xs text-gray-400">{mockCaseAnalytics.dataSource.branchCode}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Submission Method</p>
              <p className="text-lg font-bold text-gray-900">{mockCaseAnalytics.dataSource.submissionMethod}</p>
              <p className="text-xs text-gray-400">
                {new Date(mockCaseAnalytics.dataSource.submissionDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scoring Comparison Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Scoring Comparison</h3>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {/* Score Comparison Chart */}
          <div className="col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h4 className="font-medium text-gray-700 mb-4">Case Score vs. Benchmarks</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
                <YAxis dataKey="name" type="category" stroke="#6b7280" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}/100`, 'Score']}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
            
            {/* Score Trend */}
            <h4 className="font-medium text-gray-700 mt-6 mb-4">Average Score Trend (6 months)</h4>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={mockCaseAnalytics.scoringComparison.scoreTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis domain={[70, 100]} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <ReferenceLine 
                  y={mockCaseAnalytics.scoringComparison.caseScore} 
                  stroke="#10b981" 
                  strokeDasharray="5 5"
                  label={{ value: 'This Case', fill: '#10b981', fontSize: 12 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="#6b7280" 
                  strokeWidth={2}
                  dot={{ fill: '#6b7280' }}
                  name="Avg Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Ranking Cards */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 opacity-80" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-green-100 text-sm mb-1">Percentile Rank</p>
              <p className="text-4xl font-bold">{mockCaseAnalytics.scoringComparison.percentile}th</p>
              <p className="text-green-100 text-sm mt-2">{mockCaseAnalytics.scoringComparison.rank}</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="text-sm text-gray-500 mb-1">Case Score</p>
              <p className="text-3xl font-bold text-green-600">
                {mockCaseAnalytics.scoringComparison.caseScore}
              </p>
              <p className="text-xs text-gray-400 mt-1">out of 100</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <p className="text-sm text-gray-500 mb-1">Cases Compared</p>
              <p className="text-3xl font-bold text-gray-900">
                {mockCaseAnalytics.scoringComparison.totalCasesCompared.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">total submissions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Indicators Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Key Evaluation Indicators</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {mockCaseAnalytics.keyIndicators.map((indicator, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-600">{indicator.label}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(indicator.status)}`}>
                  {indicator.status.charAt(0).toUpperCase() + indicator.status.slice(1)}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">{indicator.value}</p>
              <p className="text-xs text-gray-500">{indicator.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Comparison Summary */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-gray-900">Similar Cases Comparison</h3>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Similar Cases Found</p>
              <p className="text-3xl font-bold text-amber-600">
                {mockCaseAnalytics.caseComparison.similarCases}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <CheckCircle2 className="w-3 h-3 text-green-500 mr-1" />
                  {mockCaseAnalytics.caseComparison.approvedSimilar} approved
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 text-red-500 mr-1" />
                  {mockCaseAnalytics.caseComparison.declinedSimilar} declined
                </span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Average Premium (Similar)</p>
              <p className="text-3xl font-bold text-gray-900">
                {mockCaseAnalytics.caseComparison.avgPremiumSimilar}
              </p>
              <p className="text-xs text-gray-400 mt-2">based on similar profile</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">This Case Premium</p>
              <p className="text-3xl font-bold text-green-600">
                {mockCaseAnalytics.caseComparison.thisCasePremium}
              </p>
              <p className="text-xs text-green-600 mt-2">
                {mockCaseAnalytics.caseComparison.premiumVariance} vs average
              </p>
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
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>View Distribution</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Analytics;
