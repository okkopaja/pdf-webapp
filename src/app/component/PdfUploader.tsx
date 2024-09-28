import { useState } from "react";
import { savePDF, getPDF } from "../lib/idb";

export default function Home() {
  const [pdfName, setPdfName] = useState("");
  const [file, setFile] = useState(null);
  const [retrievedPDF, setRetrievedPDF] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSave = async () => {
    if (file && pdfName) {
      try {
        await savePDF(pdfName, file);
        alert("PDF saved successfully!");
      } catch (error) {
        alert("Error saving PDF: " + error);
      }
    } else {
      alert("Please provide a name and select a file.");
    }
  };

  const handleRetrieve = async () => {
    try {
      const result = await getPDF(pdfName);
      if (result) {
        console.log(pdfName);
        const url = URL.createObjectURL(result.file);
        setRetrievedPDF(url);
      } else {
        alert("No PDF found with that name.");
      }
    } catch (error) {
      alert("Error retrieving PDF: " + error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>PDF Storage App</h1>

      <div style={{ marginBottom: "20px" }} className="">
        <input
          className=""
          type="text"
          placeholder="Enter PDF name"
          value={pdfName}
          onChange={(e) => setPdfName(e.target.value)}
        ></input>
      </div>

      <div style={{ marginBottom: "20px" }} className="">
        <input
          type="file"
          onChange={handleFileChange}
          className=""
        ></input>
      </div>

      <button onClick={handleSave} style={{ marginRight: "10px" }}>
        Save PDF
      </button>
      <button onClick={handleRetrieve}>Retrieve PDF</button>

      {retrievedPDF && (
        <div style={{ marginTop: "50px" }}>
          <h2>Retrieved PDF:</h2>
          <iframe
            src={retrievedPDF}
            width="800"
            height="600"
            className=""
          ></iframe>
        </div>
      )}
    </div>
  );
}
