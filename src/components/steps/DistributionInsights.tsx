import { ArrowLeft, Users, TrendingUp, MapPin, Target, Award, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockDistributionInsights } from '../../data/mockData';

interface DistributionInsightsProps {
  onPrevious: () => void;
}

const DistributionInsights = ({ onPrevious }: DistributionInsightsProps) => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Distribution Insights
        </h2>
        <p className="text-gray-600">
          Channel performance and agent analytics
        </p>
      </div>

      {/* Top Performing Agents */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Agents</h3>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Submissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Approval Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Premium
                </th>
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

      {/* Channel Performance */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Channel Performance</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {mockDistributionInsights.channelPerformance.map((channel, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{channel.channel}</h4>
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

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Territorial Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Territorial Distribution</h3>
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

        {/* Conversion Funnel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
          </div>
          <div className="space-y-3">
            {mockDistributionInsights.conversionFunnel.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                  <span className="text-sm font-bold text-gray-900">{stage.count}</span>
                </div>
                <div className="h-10 bg-gray-200 rounded overflow-hidden">
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

      {/* Key Highlights */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-green-900 mb-4">Distribution Highlights</h3>
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

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button onClick={onPrevious} className="btn-secondary flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary flex items-center space-x-2"
        >
          <span>Restart Demo</span>
        </button>
      </div>
    </div>
  );
};

export default DistributionInsights;
