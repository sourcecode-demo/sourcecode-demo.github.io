import { FileText, CheckCircle2, XCircle, Clock, TrendingUp, Users, MapPin, Target, Award, DollarSign, X } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockAnalytics, mockDistributionInsights } from '../../data/underwritingMock';

interface DashboardProps {
  onClose: () => void;
}

const Dashboard = ({ onClose }: DashboardProps) => {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 rounded-t-xl flex items-center justify-between z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Business Dashboard</h2>
              <p className="text-sm text-gray-500">Aggregate analytics and distribution insights</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-8">
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
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Rating Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={mockAnalytics.riskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
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

            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Distribution Insights</h3>

              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <h4 className="text-lg font-semibold text-gray-900">Top Performing Agents</h4>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Agent</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Submissions</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Approval Rate</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Premium</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockDistributionInsights.topPerformingAgents.map((agent, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              index === 0 ? 'bg-yellow-100 text-yellow-700' :
                              index === 1 ? 'bg-gray-100 text-gray-700' :
                              index === 2 ? 'bg-orange-100 text-orange-700' :
                              'bg-blue-50 text-blue-600'
                            }`}>
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {agent.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-medium text-gray-900">{agent.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {agent.code}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-900">{agent.submissions}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 max-w-[100px]">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${agent.approvalRate}%` }}
                                  />
                                </div>
                              </div>
                              <span className="text-sm font-semibold text-green-600">{agent.approvalRate}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-blue-600">{agent.premium}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Channel Performance</h4>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {mockDistributionInsights.channelPerformance.map((channel, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-gray-900">{channel.channel}</h5>
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Submissions</p>
                          <p className="text-2xl font-bold text-gray-900">{channel.submissions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Approval Rate</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                                style={{ width: `${channel.approvalRate}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-green-600">{channel.approvalRate}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Total Premium</p>
                          <p className="text-xl font-bold text-blue-600">{channel.premium}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Territorial Distribution</h4>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={mockDistributionInsights.territorialDistribution} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" stroke="#6b7280" />
                      <YAxis dataKey="region" type="category" stroke="#6b7280" width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="submissions" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="w-5 h-5 text-orange-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Conversion Funnel</h4>
                  </div>
                  <div className="space-y-3">
                    {mockDistributionInsights.conversionFunnel.map((stage, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                          <span className="text-sm font-bold text-gray-900">{stage.count}</span>
                        </div>
                        <div className="h-8 bg-gray-200 rounded overflow-hidden">
                          <div
                            className={`h-full flex items-center justify-end pr-3 text-white font-semibold text-sm ${
                              index === 0 ? 'bg-blue-500' :
                              index === 1 ? 'bg-blue-600' :
                              index === 2 ? 'bg-blue-700' :
                              index === 3 ? 'bg-green-500' :
                              'bg-green-600'
                            }`}
                            style={{ width: `${stage.percentage}%` }}
                          >
                            {stage.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mt-8">
                <h4 className="text-lg font-semibold text-green-900 mb-4">Distribution Highlights</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <p className="text-sm text-gray-600">Total Premium</p>
                    </div>
                    <p className="text-2xl font-bold text-green-600">₱2.36B</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <p className="text-sm text-gray-600">Top Channel</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">Agency</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">42.7%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
