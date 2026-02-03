import { ArrowLeft, ArrowRight, Upload, FileText, CheckCircle2, Image } from 'lucide-react';
import { ekycIdDocument } from '../../../data/ekycMock';
import cccdImage from '../../../data/cccd3.png';

interface IdUploadProps {
  onNext: () => void;
  onPrevious: () => void;
  isProcessing: boolean;
  idUploaded: boolean;
  onUpload: () => void;
}

const IdUpload = ({ onNext, onPrevious, isProcessing, idUploaded, onUpload }: IdUploadProps) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ID Document Upload</h2>
        <p className="text-gray-600">
          Upload a government-issued ID for OCR extraction and verification.
        </p>
      </div>

      <div className={`grid gap-6 mb-8 ${idUploaded ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <div className="border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload National ID</h3>
          <p className="text-sm text-gray-600 mb-6">
            JPG, PNG, or PDF (max 5 MB). Demo uses a preloaded sample.
          </p>
          <button
            onClick={onUpload}
            disabled={idUploaded}
            className="btn-success disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {idUploaded ? 'ID Uploaded' : 'Load Demo ID'}
          </button>
        </div>

        {idUploaded && (
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-900">Document Details</h3>
            </div>
            <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Image className="w-4 h-4 text-emerald-600" />
                  <span>ID Preview</span>
                </div>
                <span className="text-xs text-gray-400">cccd3.png</span>
              </div>
              <img
                src={cccdImage}
                alt="Vietnam national ID sample"
                className="w-full h-40 object-contain bg-white"
              />
            </div>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">Type</p>
                <p className="font-semibold text-gray-900">{ekycIdDocument.documentType}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">Issuing Authority</p>
                <p className="font-semibold text-gray-900">{ekycIdDocument.issuingAuthority}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">Issue Date</p>
                  <p className="font-semibold text-gray-900">{ekycIdDocument.issueDate}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">Expiry Date</p>
                  <p className="font-semibold text-gray-900">{ekycIdDocument.expiryDate}</p>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-emerald-700">
                  Document quality: <span className="font-semibold">{ekycIdDocument.documentQuality}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {idUploaded && (
        <div className="mb-6 flex items-center space-x-2 text-emerald-700">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm">ID uploaded successfully and queued for OCR.</span>
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={onPrevious} className="btn-secondary flex items-center space-x-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>
        <button
          onClick={onNext}
          disabled={!idUploaded || isProcessing}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Run OCR Extraction</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default IdUpload;
