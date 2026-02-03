import { ArrowLeft, ArrowRight, UserCheck, CheckCircle2, XCircle } from 'lucide-react';
import { ekycFaceMatch, ekycTooltips } from '../../../data/ekycMock';
import Tooltip from '../../../components/Tooltip';

interface FaceMatchProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  processingStage: string;
}

const FaceMatch = ({ onNext, onPrevious, isProcessing, processingStage }: FaceMatchProps) => {
  const isMatch = ekycFaceMatch.similarityScore >= ekycFaceMatch.threshold;

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Face Match</h2>
            <p className="text-gray-600">
              Compare live selfie to ID photo using biometric embeddings.
            </p>
          </div>
          <Tooltip content={ekycTooltips.faceMatch} showIcon={true}>
            <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm font-semibold cursor-help">
              <UserCheck className="w-4 h-4" />
              <span>AI face match</span>
            </div>
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Capture Metrics</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Selfie quality score</span>
              <span className="font-semibold text-gray-900">{ekycFaceMatch.selfieScore}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>ID photo quality score</span>
              <span className="font-semibold text-gray-900">{ekycFaceMatch.idPhotoScore}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Similarity threshold</span>
              <span className="font-semibold text-gray-900">{(ekycFaceMatch.threshold * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Explanation</p>
            <p className="text-sm text-gray-700">{ekycFaceMatch.explanation}</p>
          </div>
        </div>

        <div className={`rounded-xl p-6 border ${isMatch ? 'border-emerald-200 bg-emerald-50' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-center space-x-3 mb-4">
            {isMatch ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Match Result</h3>
              <p className={`text-sm ${isMatch ? 'text-emerald-700' : 'text-red-700'}`}>
                {ekycFaceMatch.decision}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Similarity Score</p>
            <div className="flex items-center space-x-3">
              <div className="flex-1 h-3 bg-white rounded-full overflow-hidden border border-gray-200">
                <div
                  className={`h-full ${isMatch ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${ekycFaceMatch.similarityScore * 100}%` }}
                />
              </div>
              <span className="text-lg font-bold text-gray-900">
                {(ekycFaceMatch.similarityScore * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Threshold: {(ekycFaceMatch.threshold * 100).toFixed(0)}% (demo)
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Matching Faces</h3>
              <p className="text-gray-600 mb-4">{processingStage || 'Comparing embeddings...'}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
              <p className="text-sm text-gray-500">Biometric comparison in progress (demo)</p>
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
          <span>Generate Decision</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FaceMatch;
