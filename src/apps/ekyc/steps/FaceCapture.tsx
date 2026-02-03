import { CheckCircle2, Video, ShieldCheck, ArrowRight, Image } from 'lucide-react';
import { ekycApplicant, ekycCapture, ekycTooltips } from '../../../data/ekycMock';
import Tooltip from '../../../components/Tooltip';
import demoVideo from '../../../data/KieuHuuYen_Live_Video_Demo.mp4';

interface FaceCaptureProps {
  onNext: () => void;
  isProcessing: boolean;
  faceCaptured: boolean;
  onCapture: () => void;
}

const FaceCapture = ({ onNext, isProcessing, faceCaptured, onCapture }: FaceCaptureProps) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Face Capture Preview</h2>
        <p className="text-gray-600">
          Use the demo selfie and liveness checks before verifying the ID.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-emerald-800">Preview Clip</span>
            </div>
            <Tooltip content={ekycTooltips.liveness} showIcon={true}>
              <span className="text-xs text-emerald-700 cursor-help">Liveness</span>
            </Tooltip>
          </div>
          <div className="h-64 bg-gray-900 flex items-center justify-center">
            <div className="w-44 h-44 rounded-full border-4 border-emerald-400 overflow-hidden bg-black">
              <video
                className="w-full h-full object-cover"
                src={demoVideo}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Source: <span className="font-semibold text-gray-900">Demo live video</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Liveness verified</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant Summary</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">Full name</p>
              <p className="text-lg font-semibold text-gray-900">{ekycApplicant.fullName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">DOB</p>
                <p className="font-semibold text-gray-900">{ekycApplicant.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">Nationality</p>
                <p className="font-semibold text-gray-900">{ekycApplicant.nationality}</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">ID Number</p>
              <p className="font-semibold text-gray-900">{ekycApplicant.idNumber}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400">Address</p>
              <p className="text-gray-700">{ekycApplicant.address}</p>
            </div>
          </div>
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm">
                Liveness status: <span className="font-semibold">{ekycCapture.livenessStatus}</span>
              </span>
            </div>
            <p className="text-xs text-emerald-700 mt-2">
              Capture quality: {ekycCapture.captureQuality}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onCapture}
          disabled={faceCaptured}
          className="btn-success flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image className="w-5 h-5" />
          <span>{faceCaptured ? 'Selfie Loaded' : 'Load Demo Selfie'}</span>
        </button>
        <button
          onClick={onNext}
          disabled={!faceCaptured || isProcessing}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Continue to ID Upload</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {faceCaptured && (
        <div className="mt-6 flex items-center space-x-2 text-emerald-700">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">Selfie saved for face matching.</span>
        </div>
      )}
    </div>
  );
};

export default FaceCapture;
