/** @typedef {import('#types/models.js').AppEnv} AppEnv */

/** @type {AppEnv} */
export const env = {
  resumeFile: import.meta.env.VITE_RESUME_FILE || '/files/Swaraj%20Patil%205.pdf',
  pdfWorkerSrc:
    import.meta.env.VITE_PDF_WORKER_SRC ||
    'https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs',
};
