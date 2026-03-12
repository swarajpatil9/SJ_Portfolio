import { Download } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
        <div id="window-header">
            <WindowControls target="resume"/>
            <h2>Swaraj Patil Resume</h2>

            <a href="/files/Swaraj%20Patil%205.pdf" className="cursor-pointer" title="Download Resume">
                <Download className="icon" />
            </a>
        </div>

        <Document 
          file="/files/Swaraj%20Patil%205.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error('Error loading PDF:', error)}
        >
            <Page 
              pageNumber={1} 
              renderTextLayer={true} 
              renderAnnotationLayer={true} 
            />
        </Document>
    </>
  )
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
