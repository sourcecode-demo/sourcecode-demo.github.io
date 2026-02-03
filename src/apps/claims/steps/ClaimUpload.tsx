import { Upload, FileText, CheckCircle2, ArrowRight, Eye } from 'lucide-react';
import { claimDocuments } from '../../../data/claimsMock';
import { useState } from 'react';
import DocumentViewer from '../../../components/DocumentViewer';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

const standardFontDataUrl = (() => {
  const url = new URL('pdfjs-dist/standard_fonts/', import.meta.url).toString();
  return url.endsWith('/') ? url : `${url}/`;
})();

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
pdfjs.GlobalWorkerOptions.standardFontDataUrl = standardFontDataUrl;

const PDFThumbnail = ({ path }: { path: string }) => {
  return (
    <div className="w-10 h-10 bg-white flex items-center justify-center overflow-hidden">
      <Document
        file={path}
        options={{ standardFontDataUrl }}
        loading={<div className="text-[8px] text-gray-400">Loading</div>}
        error={<FileText className="w-4 h-4 text-gray-400" />}
      >
        <Page
          pageNumber={1}
          width={40}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};

const PDFPreviewCard = ({ path, name }: { path: string; name: string }) => {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
      <Document
        file={path}
        options={{ standardFontDataUrl }}
        loading={<div className="text-xs text-gray-400">Loading...</div>}
        error={<div className="text-xs text-gray-400">Preview unavailable</div>}
      >
        <Page
          pageNumber={1}
          width={180}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <span className="sr-only">{name}</span>
    </div>
  );
};

interface ClaimUploadProps {
  onNext: () => void;
  isProcessing: boolean;
  documentsUploaded: boolean;
  onUpload: () => void;
}

const ClaimUpload = ({ onNext, isProcessing, documentsUploaded, onUpload }: ClaimUploadProps) => {
  const [showViewer, setShowViewer] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const viewerDocuments = claimDocuments.map(doc => ({
    name: doc.name,
    path: doc.path,
    type: doc.previewType === 'image' ? 'image' : 'pdf'
  }));

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setShowViewer(true);
  };
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Claim Document Intake</h2>
        <p className="text-gray-600">
          Upload claim documents for OCR extraction and eligibility mapping.
        </p>
      </div>

      <div className={`grid gap-6 mb-8 ${documentsUploaded ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <div className="border-2 border-dashed border-purple-300 bg-purple-50 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Claim Pack</h3>
          <p className="text-sm text-gray-600 mb-6">
            Invoices, hospital records, prescriptions, and diagnosis reports.
          </p>
          <button
            onClick={onUpload}
            disabled={documentsUploaded}
            className="btn-success disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {documentsUploaded ? 'Documents Loaded' : 'Load Demo Documents'}
          </button>
        </div>

        {documentsUploaded && (
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Document Checklist</h3>
            </div>
            <div className="space-y-3">
              {claimDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-purple-600 overflow-hidden">
                      {doc.previewType === 'image' ? (
                        <img src={doc.path} alt={doc.name} className="w-full h-full object-cover" />
                      ) : (
                        <PDFThumbnail path={doc.path} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.typeLabel} • {doc.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => openViewer(index)}
                      className="text-xs text-purple-600 font-semibold flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    <span className="text-xs text-purple-600 font-semibold">{doc.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {documentsUploaded && (
        <>
          <div className="mb-6 flex items-center space-x-2 text-purple-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm">All claim documents are ready for OCR.</span>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Claim Documents</h3>
            <div className="grid grid-cols-3 gap-4">
              {claimDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div
                    className="relative h-56 cursor-pointer overflow-hidden border-b border-gray-100"
                    onClick={() => openViewer(index)}
                  >
                    {doc.previewType === 'image' ? (
                      <img
                        src={doc.path}
                        alt={doc.name}
                        className="w-full h-full object-contain bg-white"
                      />
                    ) : (
                      <PDFPreviewCard path={doc.path} name={doc.name} />
                    )}
                    <div className="absolute top-2 right-2 z-10">
                      <span className={`text-xs font-bold px-2 py-1 rounded shadow-md ${
                        doc.previewType === 'pdf' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                      }`}>
                        {doc.previewType === 'pdf' ? 'PDF' : 'IMAGE'}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20 hover:bg-black/40">
                      <div className="text-center">
                        <div className="bg-white rounded-full p-3 shadow-lg mx-auto inline-block">
                          <Eye className="w-6 h-6 text-purple-600" />
                        </div>
                        <p className="text-white text-sm mt-2 font-medium">Click to view</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-medium text-gray-900 truncate text-sm" title={doc.name}>
                      {doc.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                        {doc.typeLabel}
                      </span>
                      <span className="text-xs text-gray-500">{doc.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!documentsUploaded || isProcessing}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Run OCR Extraction</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <DocumentViewer
        documents={viewerDocuments}
        isOpen={showViewer}
        onClose={() => setShowViewer(false)}
        initialIndex={viewerIndex}
      />
    </div>
  );
};

export default ClaimUpload;
