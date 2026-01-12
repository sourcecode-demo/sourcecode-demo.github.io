import { FileText, Image, Upload, CheckCircle2, Clock, X, File } from 'lucide-react';
import { useState } from 'react';
import { mockSubmission } from '../../data/mockData';

interface SubmissionIntakeProps {
  onNext: () => void;
  isProcessing: boolean;
  processingStage: string;
  filesUploaded: boolean;
  setFilesUploaded: (uploaded: boolean) => void;
}

const SubmissionIntake = ({ onNext, isProcessing, processingStage, filesUploaded, setFilesUploaded }: SubmissionIntakeProps) => {
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      simulateUpload(Array.from(files));
    }
  };

  const simulateUpload = (files: File[]) => {
    files.forEach((file, index) => {
      setTimeout(() => {
        setUploadingFiles(prev => [...prev, file.name]);
        
        // Simulate upload progress
        setTimeout(() => {
          setUploadingFiles(prev => prev.filter(f => f !== file.name));
          setUploadedFiles(prev => [...prev, file.name]);
          
          // If all files uploaded, set filesUploaded to true
          if (uploadedFiles.length + 1 === mockSubmission.files.length) {
            setTimeout(() => setFilesUploaded(true), 500);
          }
        }, 2000 + Math.random() * 1000);
      }, index * 500);
    });
  };

  const handleDemoUpload = () => {
    // Simulate uploading all demo files
    mockSubmission.files.forEach((file, index) => {
      setTimeout(() => {
        setUploadingFiles(prev => [...prev, file.name]);
        
        setTimeout(() => {
          setUploadingFiles(prev => prev.filter(f => f !== file.name));
          setUploadedFiles(prev => [...prev, file.name]);
          
          if (index === mockSubmission.files.length - 1) {
            setTimeout(() => setFilesUploaded(true), 500);
          }
        }, 2000 + Math.random() * 1000);
      }, index * 800);
    });
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

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f !== fileName));
    if (uploadedFiles.length <= 1) {
      setFilesUploaded(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Submission Intake
        </h2>
        <p className="text-gray-600">
          Upload application documents for processing
        </p>
      </div>

      {/* Upload Area */}
      {!filesUploaded ? (
        <div className="mb-8">
          <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-xl p-12 hover:border-blue-400 hover:bg-blue-100 transition-all">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Upload Application Documents
              </h3>
              <p className="text-gray-600 mb-6">
                Drag and drop files here, or click to browse
              </p>
              <div className="flex space-x-3">
                <label className="btn-primary cursor-pointer">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                  />
                  Browse Files
                </label>
                <button
                  onClick={handleDemoUpload}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Use Demo Files
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: PDF, PNG, JPG, WEBP
              </p>
            </div>
          </div>

          {/* Uploading Files */}
          {uploadingFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-gray-700">Uploading...</h4>
              {uploadingFiles.map((fileName, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
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

          {/* Uploaded Files (not complete yet) */}
          {uploadedFiles.length > 0 && uploadedFiles.length < mockSubmission.files.length && (
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-gray-700">Uploaded ({uploadedFiles.length}/{mockSubmission.files.length})</h4>
              {uploadedFiles.map((fileName, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">{fileName}</span>
                  </div>
                  <button
                    onClick={() => removeFile(fileName)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Success Banner */}
          <div className="mb-8 border-2 border-dashed border-green-300 bg-green-50 rounded-xl p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                All Documents Uploaded Successfully
              </h3>
              <p className="text-green-700 mb-4">
                {mockSubmission.files.length} files ready for processing
              </p>
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Clock className="w-4 h-4" />
                <span>Submitted on Jul 17, 2025 at 10:30 AM</span>
              </div>
            </div>
          </div>

          {/* File List */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Uploaded Documents
            </h3>
            {mockSubmission.files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {getFileTypeLabel(file.type)}
                      </span>
                      <span className="text-xs text-gray-500">{file.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">
                    Validated
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Document Preview Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h4 className="font-semibold text-blue-900 mb-3">
              Document Validation Summary
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Total Files</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockSubmission.files.length}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Total Size</p>
                <p className="text-2xl font-bold text-blue-600">5.0 MB</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Quality Check</p>
                <p className="text-2xl font-bold text-green-600">✓ Passed</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Processing Documents
              </h3>
              <p className="text-gray-600 mb-4">
                {processingStage || 'Initializing OCR engine...'}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
              <p className="text-sm text-gray-500">
                This may take 15-20 seconds
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
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
    </div>
  );
};

export default SubmissionIntake;
