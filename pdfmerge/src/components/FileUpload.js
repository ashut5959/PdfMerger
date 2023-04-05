import React, { useState } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    let fileArray = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].type !== "application/pdf") {
        setErrorMsg("Please select only PDF files");
        setFiles([]);
        return;
      }
      fileArray.push(selectedFiles[i]);
    }

    setErrorMsg("");
    setFiles(fileArray);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('pdfs', files[i]);
      }
      const response = await fetch("http://127.0.0.1:8080/upload", {
        method: "POST",
        body: formData,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" name="pdfs" multiple onChange={handleFileChange} />
      {errorMsg && <div>{errorMsg}</div>}
      <button onClick={handleUpload} disabled={files.length === 0}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
