import { ArrowRight, ArrowLeft, TrendingUp, FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockAnalytics } from '../../data/mockData';

interface AnalyticsProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
}

const Analytics = ({ onNext, onPrevious, isProcessing }: AnalyticsProps) => {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Business Analytics
        </h2>
        <p className="text-gray-600">
          Key metrics and performance insights
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-blue-100 text-sm mb-1">Total Submissions</p>
          <p className="text-4xl font-bold">{mockAnalytics.overview.totalSubmissions}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-green-100 text-sm mb-1">Approved</p>
          <p className="text-4xl font-bold">{mockAnalytics.overview.totalApproved}</p>
          <p className="text-green-100 text-xs mt-1">
            {mockAnalytics.overview.approvalRate}% approval rate
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-red-100 text-sm mb-1">Declined</p>
          <p className="text-4xl font-bold">{mockAnalytics.overview.totalDeclined}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-purple-100 text-sm mb-1">Avg Processing Time</p>
          <p className="text-3xl font-bold">{mockAnalytics.overview.avgProcessingTime}</p>
          <p className="text-purple-100 text-xs mt-1">
            {mockAnalytics.overview.autoDecisionRate}% automated
          </p>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Submission Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockAnalytics.monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="submissions" stroke="#3b82f6" strokeWidth={3} name="Submissions" />
            <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={3} name="Approved" />
            <Line type="monotone" dataKey="declined" stroke="#ef4444" strokeWidth={2} name="Declined" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Risk Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={mockAnalytics.riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.rating}: ${entry.percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {mockAnalytics.riskDistribution.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {mockAnalytics.riskDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">
                  {item.rating}: <span className="font-semibold">{item.count}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Mix */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockAnalytics.productMix}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="product" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {mockAnalytics.productMix.map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-600 mb-1">{item.product}</p>
                <p className="text-lg font-bold text-blue-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Key Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 bg-white rounded-lg p-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
            <div>
              <p className="font-medium text-gray-900">High Approval Rate</p>
              <p className="text-sm text-gray-600">
                {mockAnalytics.overview.approvalRate}% approval rate indicates strong quality of submissions
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-white rounded-lg p-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
            <div>
              <p className="font-medium text-gray-900">Automation Success</p>
              <p className="text-sm text-gray-600">
                {mockAnalytics.overview.autoDecisionRate}% of decisions automated, reducing manual review time
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-white rounded-lg p-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
            <div>
              <p className="font-medium text-gray-900">Fast Processing</p>
              <p className="text-sm text-gray-600">
                Average processing time of {mockAnalytics.overview.avgProcessingTime} enables quick turnaround
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
