import { useState } from 'react';
import { X, FileText, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface Document {
  name: string;
  path: string;
  type: 'pdf' | 'image';
}

interface DocumentViewerProps {
  documents: Document[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const DocumentViewer = ({ documents, isOpen, onClose, initialIndex = 0 }: DocumentViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!isOpen) return null;

  const currentDoc = documents[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : documents.length - 1));
    setZoom(100);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < documents.length - 1 ? prev + 1 : 0));
    setZoom(100);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FileText className="w-6 h-6 text-blue-400" />
          <div>
            <h3 className="font-semibold">{currentDoc.name}</h3>
            <p className="text-sm text-gray-400">
              Document {currentIndex + 1} of {documents.length}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-1">
            <button
              onClick={handleZoomOut}
              className="p-1 hover:bg-gray-700 rounded"
              disabled={zoom <= 50}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-sm w-12 text-center">{zoom}%</span>
            <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-gray-700 rounded"
              disabled={zoom >= 200}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Document Thumbnails */}
      <div className="bg-gray-800 px-6 py-3 flex items-center space-x-3 overflow-x-auto">
        {documents.map((doc, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setZoom(100);
            }}
            className={`flex-shrink-0 p-2 rounded-lg transition-all ${
              index === currentIndex
                ? 'bg-blue-600 ring-2 ring-blue-400'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <div className="w-16 h-20 bg-gray-600 rounded flex items-center justify-center overflow-hidden">
              {doc.type === 'image' ? (
                <img
                  src={doc.path}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FileText className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <p className="text-xs text-gray-300 mt-1 truncate w-16">{doc.name.split(' - ')[0]}</p>
          </button>
        ))}
      </div>

      {/* Main Viewer */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        {/* Navigation - Left */}
        <button
          onClick={handlePrev}
          className="absolute left-4 p-3 bg-gray-800 hover:bg-gray-700 rounded-full z-10 transition-colors"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>

        {/* Document Content */}
        <div
          className={`bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'w-full h-full' : 'max-w-4xl max-h-full'
          }`}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center',
          }}
        >
          {currentDoc.type === 'pdf' ? (
            <iframe
              src={`${currentDoc.path}#toolbar=0&navpanes=0`}
              className="w-full"
              style={{ height: isFullscreen ? '100vh' : '80vh', minWidth: '800px' }}
              title={currentDoc.name}
            />
          ) : (
            <img
              src={currentDoc.path}
              alt={currentDoc.name}
              className="max-w-full max-h-full object-contain"
              style={{ maxHeight: isFullscreen ? '100vh' : '80vh' }}
            />
          )}
        </div>

        {/* Navigation - Right */}
        <button
          onClick={handleNext}
          className="absolute right-4 p-3 bg-gray-800 hover:bg-gray-700 rounded-full z-10 transition-colors"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white px-6 py-3 flex justify-center">
        <div className="flex items-center space-x-2">
          {documents.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setZoom(100);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-blue-500 w-4' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
