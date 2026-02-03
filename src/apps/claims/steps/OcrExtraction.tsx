import { ArrowLeft, ArrowRight, FileSearch, Sparkles, CheckCircle2 } from 'lucide-react';
import { claimOcrResults, claimTooltips } from '../../../data/claimsMock';
import Tooltip from '../../../components/Tooltip';

interface OcrExtractionProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  processingStage: string;
}

const OcrExtraction = ({ onNext, onPrevious, isProcessing, processingStage }: OcrExtractionProps) => {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Claims OCR Extraction</h2>
          <p className="text-gray-600">
            Extract medical and billing data from uploaded documents.
          </p>
        </div>
        <Tooltip content={claimTooltips.ocr} showIcon={true}>
          <div className="flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-full text-sm font-semibold cursor-help">
            <Sparkles className="w-4 h-4" />
            <span>{claimOcrResults.overallConfidence}% confidence</span>
          </div>
        </Tooltip>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Data</h3>
          <div className="space-y-3">
            {claimOcrResults.medicalData.map((item, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
                <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>{item.confidence.toFixed(1)}% confidence</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Data</h3>
          <div className="space-y-3">
            {claimOcrResults.billingData.map((item, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
                <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span>{item.confidence.toFixed(1)}% confidence</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 mb-8">
        <div className="flex items-center space-x-2 text-purple-700 font-semibold mb-2">
          <FileSearch className="w-5 h-5" />
          <span>Extraction Summary</span>
        </div>
        <p className="text-sm text-purple-700">
          Key medical and billing fields extracted successfully. Ready for policy lookup.
        </p>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Running OCR</h3>
              <p className="text-gray-600 mb-4">{processingStage || 'Parsing documents...'}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
              <p className="text-sm text-gray-500">OCR pipeline (demo simulation)</p>
            </div>
          </div>
        </div>
      )}

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
          <span>Lookup Policy</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default OcrExtraction;
