import { ArrowLeft, ArrowRight, FileSearch, CheckCircle2, Sparkles } from 'lucide-react';
import { ekycOcrExtraction, ekycTooltips } from '../../../data/ekycMock';
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
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">OCR Extraction</h2>
            <p className="text-gray-600">
              ID fields extracted and normalized for verification.
            </p>
          </div>
          <Tooltip content={ekycTooltips.ocr} showIcon={true}>
            <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-full text-sm font-semibold cursor-help">
              <Sparkles className="w-4 h-4" />
              <span>{ekycOcrExtraction.overallConfidence}% confidence</span>
            </div>
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {ekycOcrExtraction.fields.map((field, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{field.label}</p>
            <p className="text-lg font-semibold text-gray-900">{field.value}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1 text-emerald-600">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified</span>
              </div>
              <span>{field.confidence.toFixed(1)}% confidence</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 mb-8">
        <div className="flex items-center space-x-2 text-emerald-700 font-semibold mb-2">
          <FileSearch className="w-5 h-5" />
          <span>OCR Quality Check</span>
        </div>
        <p className="text-sm text-emerald-700">
          All mandatory fields extracted with high confidence. Ready for biometric comparison.
        </p>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Extracting ID Data</h3>
              <p className="text-gray-600 mb-4">{processingStage || 'Running OCR models...'}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-emerald-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }} />
              </div>
              <p className="text-sm text-gray-500">Processing ID OCR (demo simulation)</p>
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
          <span>Run Face Match</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default OcrExtraction;
