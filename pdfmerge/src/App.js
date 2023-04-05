import React, { useState } from 'react';
import PdfUploader from './components/FileUpload';
import PdfDownloader from './components/PdfDownloader';

function App() {
  const [mergeComplete, setMergeComplete] = useState(false);

  const handleMergeComplete = () => {
    setMergeComplete(true);
  };

  return (
    <div>
      <PdfUploader onMergeComplete={handleMergeComplete} />
      {mergeComplete && <PdfDownloader />}
    </div>
  );
}

export default App;
