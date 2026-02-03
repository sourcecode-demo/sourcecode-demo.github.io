import { FileText, ShieldCheck, UserCheck, ArrowRight, Sparkles } from 'lucide-react';

type DemoApp = 'underwriting' | 'ekyc' | 'claims';

interface AppSelectorProps {
  onSelect: (app: DemoApp) => void;
}

const AppSelector = ({ onSelect }: AppSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">VC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sales Demo Hub</h1>
                <p className="text-sm text-gray-500">AI-powered insurance flows for client walkthroughs</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Live demo experience</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose a Demo App</h2>
          <p className="text-gray-600">
            Each flow is fully scripted for sales demos, with hover tooltips explaining the AI logic.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <button
            onClick={() => onSelect('underwriting')}
            className="text-left bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Underwriting OCR
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Intelligent Underwriting</h3>
            <p className="text-sm text-gray-600 mb-4">
              Document intake → OCR extraction → underwriting decision → audit analytics.
            </p>
            <div className="space-y-2 text-xs text-gray-500 mb-4">
              <div>• OCR confidence math + rule validation</div>
              <div>• Agentic underwriting reasoning</div>
              <div>• Distribution & dashboard insights</div>
            </div>
            <div className="flex items-center text-blue-600 font-semibold text-sm">
              Launch demo <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onSelect('ekyc')}
            className="text-left bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                eKYC End-to-End
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Identity Verification</h3>
            <p className="text-sm text-gray-600 mb-4">
              Face capture → ID upload → OCR → face match → decision & audit.
            </p>
            <div className="space-y-2 text-xs text-gray-500 mb-4">
              <div>• Local OCR + VN ID extraction</div>
              <div>• Liveness + biometric similarity</div>
              <div>• Explainable decision reasons</div>
            </div>
            <div className="flex items-center text-emerald-600 font-semibold text-sm">
              Launch demo <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => onSelect('claims')}
            className="text-left bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                Claims Processing
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Claims Automation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Claim docs → OCR → policy lookup → AI mapping → payout decision.
            </p>
            <div className="space-y-2 text-xs text-gray-500 mb-4">
              <div>• Multi-document extraction</div>
              <div>• Benefit eligibility mapping</div>
              <div>• Audit-ready claim reasoning</div>
            </div>
            <div className="flex items-center text-purple-600 font-semibold text-sm">
              Launch demo <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Demo Guidance</h4>
          <p className="text-sm text-gray-600">
            Use the tooltips and step indicators to guide the story of the end-to-end flows.
          </p>
        </div>
      </main>
    </div>
  );
};

export type { DemoApp };
export default AppSelector;
