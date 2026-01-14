import { FileText, Image, Upload, CheckCircle2, Clock, File, Check, AlertTriangle, Sparkles, User, Briefcase, Heart, DollarSign, Eye } from 'lucide-react';
import { useState } from 'react';
import { happyCaseFiles, unhappyCaseFiles, mockOCRResults, mockUnhappyOCRResults } from '../../data/mockData';
import DocumentViewer from '../DocumentViewer';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface SubmissionIntakeProps {
  onNext: () => void;
  isProcessing: boolean;
  processingStage: string;
  filesUploaded: boolean;
  setFilesUploaded: (uploaded: boolean) => void;
  isUnhappyCase: boolean;
  onToggleCase: (isUnhappy: boolean) => void;
}

const PDFThumbnail = ({ file }: { file: any }) => {
  const [loadError, setLoadError] = useState(false);

  if (loadError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-red-50">
        <FileText className="w-12 h-12 text-red-400 mb-2" />
        <span className="text-[10px] text-red-600 font-medium px-2 text-center line-clamp-2">
          Preview unavailable
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
      <Document
        file={file.path}
        onLoadError={(error) => {
          console.error("PDF Load Error:", error);
          setLoadError(true);
        }}
        loading={
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-1" />
            <span className="text-[8px] text-gray-400 uppercase tracking-tighter">Rendering...</span>
          </div>
        }
      >
        <Page 
          pageNumber={1} 
          width={180} 
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          className="shadow-sm"
        />
      </Document>
    </div>
  );
};

const SubmissionIntake = ({ 
  onNext, 
  isProcessing, 
  processingStage, 
  filesUploaded, 
  setFilesUploaded,
  isUnhappyCase,
  onToggleCase
}: SubmissionIntakeProps) => {
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showViewer, setShowViewer] = useState(false);
  const [viewerInitialIndex, setViewerInitialIndex] = useState(0);

  const happyCaseData = mockOCRResults;
  const unhappyCaseData = mockUnhappyOCRResults;
  
  const currentFiles = isUnhappyCase ? unhappyCaseFiles : happyCaseFiles;
  const currentData = isUnhappyCase ? unhappyCaseData : happyCaseData;

  const handleDemoUpload = () => {
    currentFiles.forEach((file, index) => {
      setTimeout(() => {
        setUploadingFiles(prev => [...prev, file.name]);
        
        setTimeout(() => {
          setUploadingFiles(prev => prev.filter(f => f !== file.name));
          setUploadedFiles(prev => [...prev, file.name]);
          
          if (index === currentFiles.length - 1) {
            setTimeout(() => setFilesUploaded(true), 500);
          }
        }, 1500 + Math.random() * 500);
      }, index * 600);
    });
  };

  const openViewer = (index: number) => {
    setViewerInitialIndex(index);
    setShowViewer(true);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'valid_id':
        return <Image className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case 'application_form':
        return 'Application Form';
      case 'sales_illustration':
        return 'Sales Illustration';
      case 'valid_id':
        return 'Valid ID';
      default:
        return 'Document';
    }
  };

  const viewerDocuments = currentFiles.map(f => ({
    name: f.name,
    path: f.path,
    type: f.type
  }));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Submission Intake
        </h2>
        <p className="text-gray-600">
          Select a demo scenario and review application documents for processing
        </p>
      </div>

      {/* Demo Scenario Selector */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Demo Scenario</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Happy Case Card */}
          <button
            onClick={() => onToggleCase(false)}
            className={`text-left rounded-xl border-2 transition-all overflow-hidden ${
              !isUnhappyCase 
                ? 'border-green-500 shadow-lg ring-2 ring-green-200' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className={`p-4 ${!isUnhappyCase ? 'bg-green-500' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !isUnhappyCase ? 'bg-white/20' : 'bg-white'
                  }`}>
                    <Sparkles className={`w-5 h-5 ${!isUnhappyCase ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <p className={`font-bold text-lg ${!isUnhappyCase ? 'text-white' : 'text-gray-700'}`}>
                      Happy Case
                    </p>
                    <p className={`text-sm ${!isUnhappyCase ? 'text-green-100' : 'text-gray-500'}`}>
                      IHP - Low Risk - Approved
                    </p>
                  </div>
                </div>
                {!isUnhappyCase && <CheckCircle2 className="w-6 h-6 text-white" />}
              </div>
            </div>
            
            <div className="p-4 bg-white">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Applicant</p>
                    <p className="font-semibold text-gray-900">{happyCaseData.personalInfo.fullName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Occupation</p>
                      <p className="text-sm font-medium text-gray-700">{happyCaseData.personalInfo.occupation}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Age</p>
                      <p className="text-sm font-medium text-gray-700">{happyCaseData.personalInfo.age} years old</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Sum Assured</p>
                    <p className="text-sm font-medium text-gray-700">{happyCaseData.policyDetails.sumAssured}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">Health Status</p>
                    <p className="text-sm font-medium text-green-600">No pre-existing conditions</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">Expected: Standard Risk - Approved</span>
                </div>
              </div>
            </div>
          </button>

          {/* Unhappy Case Card */}
          <button
            onClick={() => onToggleCase(true)}
            className={`text-left rounded-xl border-2 transition-all overflow-hidden ${
              isUnhappyCase 
                ? 'border-red-500 shadow-lg ring-2 ring-red-200' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className={`p-4 ${isUnhappyCase ? 'bg-red-500' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isUnhappyCase ? 'bg-white/20' : 'bg-white'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${isUnhappyCase ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <p className={`font-bold text-lg ${isUnhappyCase ? 'text-white' : 'text-gray-700'}`}>
                      Unhappy Case
                    </p>
                    <p className={`text-sm ${isUnhappyCase ? 'text-red-100' : 'text-gray-500'}`}>
                      NON-GAE - High Risk - Declined
                    </p>
                  </div>
                </div>
                {isUnhappyCase && <CheckCircle2 className="w-6 h-6 text-white" />}
              </div>
            </div>
            
            <div className="p-4 bg-white">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Applicant</p>
                    <p className="font-semibold text-gray-900">{unhappyCaseData.personalInfo.fullName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Occupation</p>
                      <p className="text-sm font-medium text-red-600">{unhappyCaseData.personalInfo.occupation}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Age</p>
                      <p className="text-sm font-medium text-red-600">{unhappyCaseData.personalInfo.age} years old</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Sum Assured</p>
                    <p className="text-sm font-medium text-red-600">{unhappyCaseData.policyDetails.sumAssured}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500">Health Status</p>
                    <p className="text-sm font-medium text-red-600">{unhappyCaseData.healthDeclaration.preExistingConditions}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600 font-medium">Expected: High Risk - Declined</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Documents Preview Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Application Documents
          <span className={`ml-2 text-sm font-normal ${isUnhappyCase ? 'text-red-600' : 'text-green-600'}`}>
            ({isUnhappyCase ? 'Unhappy Case' : 'Happy Case'}: {currentData.personalInfo.fullName})
          </span>
        </h3>
        
        {/* Document Grid with Dynamic PDF Rendering */}
        <div className="grid grid-cols-3 gap-4">
          {currentFiles.map((file, index) => (
            <div
              key={`${file.path}-${index}`}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Preview Area - Dynamic Rendering */}
              <div 
                className="relative h-56 cursor-pointer overflow-hidden border-b border-gray-100"
                style={{ backgroundColor: '#ffffff' }}
                onClick={() => openViewer(index)}
              >
                {file.type === 'pdf' ? (
                  <PDFThumbnail file={file} />
                ) : (
                  <img 
                    src={file.path} 
                    alt={file.name}
                    className="w-full h-full object-contain"
                    style={{ 
                      display: 'block',
                      margin: '0 auto'
                    }}
                    loading="eager"
                  />
                )}
                
                {/* File Type Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <span className={`text-xs font-bold px-2 py-1 rounded shadow-md ${
                    file.type === 'pdf' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {file.type === 'pdf' ? 'PDF' : 'IMAGE'}
                  </span>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20 hover:bg-black/40">
                  <div className="text-center">
                    <div className="bg-white rounded-full p-3 shadow-lg mx-auto inline-block">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-white text-sm mt-2 font-medium">Click to view</p>
                  </div>
                </div>
              </div>
              
              {/* File Info */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate text-sm" title={file.name}>
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        {getFileTypeLabel(file.fileType)}
                      </span>
                      <span className="text-xs text-gray-500">{file.size}</span>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    {getFileIcon(file.fileType)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      {!filesUploaded ? (
        <div className="mb-8">
          <div className={`border-2 border-dashed rounded-xl p-8 text-center ${
            isUnhappyCase ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'
          }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isUnhappyCase ? 'bg-red-500' : 'bg-green-500'
            }`}>
              <Upload className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Process</h3>
            <p className="text-gray-600 mb-6">{currentFiles.length} documents ready for OCR processing</p>
            
            <button
              onClick={handleDemoUpload}
              disabled={uploadingFiles.length > 0}
              className={`font-semibold py-3 px-8 rounded-lg transition-all duration-200 text-lg ${
                isUnhappyCase 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl' 
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {uploadingFiles.length > 0 ? 'Uploading...' : 'Start Demo'}
            </button>
          </div>

          {uploadingFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-gray-700">Uploading Documents...</h4>
              {uploadingFiles.map((fileName, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <File className="w-5 h-5 text-blue-600 animate-pulse" />
                    <span className="text-sm text-gray-700">{fileName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-2 bg-blue-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '60%' }} />
                    </div>
                    <span className="text-xs text-blue-600">Uploading...</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {uploadedFiles.length > 0 && uploadedFiles.length < currentFiles.length && (
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-gray-700">Uploaded ({uploadedFiles.length}/{currentFiles.length})</h4>
              {uploadedFiles.map((fileName, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">{fileName}</span>
                  </div>
                  <span className="text-xs text-green-600">Complete</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={`mb-8 border-2 border-dashed rounded-xl p-8 ${
            isUnhappyCase ? 'border-amber-300 bg-amber-50' : 'border-green-300 bg-green-50'
          }`}>
            <div className="flex flex-col items-center justify-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                isUnhappyCase ? 'bg-amber-500' : 'bg-green-500'
              }`}>
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isUnhappyCase ? 'text-amber-900' : 'text-green-900'}`}>
                All Documents Uploaded Successfully
              </h3>
              <p className={`mb-2 ${isUnhappyCase ? 'text-amber-700' : 'text-green-700'}`}>
                {currentFiles.length} files ready for processing
              </p>
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isUnhappyCase ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {isUnhappyCase ? (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    <span>Unhappy Case: {unhappyCaseData.personalInfo.fullName}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Happy Case: {happyCaseData.personalInfo.fullName}</span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-4">
                <Clock className="w-4 h-4" />
                <span>Submitted on Jul 17, 2025 at 10:30 AM</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
            {currentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => openViewer(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 overflow-hidden">
                    {file.type === 'image' ? (
                      <img src={file.path} alt={file.name} className="w-full h-full object-cover" />
                    ) : (
                      getFileIcon(file.fileType)
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {getFileTypeLabel(file.fileType)}
                      </span>
                      <span className="text-xs text-gray-500">{file.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h4 className="font-semibold text-blue-900 mb-3">Document Validation Summary</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Total Files</p>
                <p className="text-2xl font-bold text-blue-600">{currentFiles.length}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Total Size</p>
                <p className="text-2xl font-bold text-blue-600">{isUnhappyCase ? '5.8 MB' : '5.3 MB'}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Quality Check</p>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-green-600">Passed</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Documents</h3>
              <p className="text-gray-600 mb-4">{processingStage || 'Initializing OCR engine...'}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
              <p className="text-sm text-gray-500">This may take 15-20 seconds</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={onNext}
          disabled={!filesUploaded || isProcessing}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Start OCR Processing</span>
          <Upload className="w-5 h-5" />
        </button>
      </div>

      <DocumentViewer
        documents={viewerDocuments}
        isOpen={showViewer}
        onClose={() => setShowViewer(false)}
        initialIndex={viewerInitialIndex}
      />
    </div>
  );
};

export default SubmissionIntake;
