import { Download } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

import { env } from '../config/env';
import { WINDOW_IDS } from '../config/windowIds';

import WindowControls from '#components/WindowControls';
import WindowWrapper from '#hoc/WindowWrapper';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = env.pdfWorkerSrc;

const Resume = () => {
  const resumeFile = env.resumeFile;

  return (
    <>
      <div id="window-header">
        <WindowControls target={WINDOW_IDS.RESUME} />
        <h2>Swaraj Patil Resume</h2>

        <a href={resumeFile} className="cursor-pointer" title="Download Resume">
          <Download className="icon" />
        </a>
      </div>

      <Document
        file={resumeFile}
        loading={<div className="p-4 text-sm text-gray-500">Loading resume...</div>}
        noData={<div className="p-4 text-sm text-gray-500">Resume file is unavailable.</div>}
        error={<div className="p-4 text-sm text-gray-500">Unable to load resume.</div>}
      >
        <Page
          pageNumber={1}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          loading={<div className="p-4 text-sm text-gray-500">Rendering page...</div>}
          error={<div className="p-4 text-sm text-gray-500">Unable to render resume page.</div>}
        />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, WINDOW_IDS.RESUME);
export default ResumeWindow;
