"use client";
import { useState } from "react";
import { getPDF } from "../lib/db"; // Assuming these are imported functions

export default function Home() {
  const [pdfName, setPdfName] = useState<string>("");
  const [file, setFile] = useState<File>(null); // Nullable File
  const [pdfData, setPdfData] = useState<string | null>(null);
  // Event handler for file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  // Handle retrieve button click
  const handleRetrieve = async () => {
    const res = await getPDF(pdfName).then((res) => {
      if (res === "error") {
        alert("File not found");
      } else {
        setPdfData(res);
      }
    });
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("name", pdfName);
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    alert("File uploaded successfully");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>PDF Storage App</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter PDF name"
          value={pdfName}
          onChange={(e) => setPdfName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input type="file" onChange={handleFileChange} />
      </div>

      <button onClick={handleUpload} style={{ marginRight: "10px" }}>
        Save PDF
      </button>
      <button onClick={handleRetrieve} style={{ marginRight: "10px" }}>
        Retrieve PDF
      </button>
      {pdfData ? (
        <embed
          src={`data:application/pdf;base64,${pdfData}`}
          width="600"
          height="800"
          type="application/pdf"
        />
      ) : (
        <></>
      )}
    </div>
  );
}
