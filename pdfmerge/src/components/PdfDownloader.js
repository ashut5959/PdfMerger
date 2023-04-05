import React, { useState } from 'react';

const PdfDownloader = () => {
  const [mergedFile, setMergedFile] = useState(null);

  const handleDownload = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/download-merged-pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      setMergedFile(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setMergedFile(null);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Merged PDF</button>
      {mergedFile && (
        <div>
          <a href={mergedFile} download="merged.pdf">
            Download Merged PDF
          </a>
          <button onClick={handleClear}>Clear</button>
        </div>
      )}
    </div>
  );
};

export default PdfDownloader;
