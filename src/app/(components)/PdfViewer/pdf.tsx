import React from 'react';

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div>
      <iframe
       className="h-full w-full"
        src={pdfUrl}
        title="PDF Viewer"
        width="100%"
        height="600px"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default PDFViewer;
