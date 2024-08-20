import React from "react";
import { useEffect, useRef } from "react";

const PDFUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!fileInputRef.current) return;

    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        storePDF(input.files[0]);
      }
    };

    fileInputRef.current.addEventListener("change", handleFileChange);

    return () => {
      if (fileInputRef.current) {
        fileInputRef.current.removeEventListener("change", handleFileChange);
      }
    };
  }, []);

  const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open("PDFStore", 1);

      request.onupgradeneeded = function (event) {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains("pdfs")) {
          db.createObjectStore("pdfs", { keyPath: "id" });
        }
      };

      request.onsuccess = function (event) {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = function (event) {
        reject(
          "Database error: " + (event.target as IDBOpenDBRequest).error?.message
        );
      };
    });
  };

  const storePDF = (file: File): void => {
    openDatabase().then((db) => {
      // Start the transaction after the file is read
      const reader = new FileReader();

      reader.onload = function () {
        const pdfData = reader.result as ArrayBuffer;
        const pdf = {
          id: "myPdf",
          data: pdfData,
        };

        const transaction = db.transaction(["pdfs"], "readwrite");
        const objectStore = transaction.objectStore("pdfs");

        const request = objectStore.add(pdf);
        request.onsuccess = () => {
          console.log("PDF stored successfully");
        };
        request.onerror = (event) => {
          console.error(
            "Error storing PDF:",
            (event.target as IDBRequest).error?.message
          );
        };
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const getPDF = (): void => {
    openDatabase().then((db) => {
      const transaction = db.transaction(["pdfs"], "readonly");
      const objectStore = transaction.objectStore("pdfs");
      const request = objectStore.get("myPdf");

      request.onsuccess = function (event) {
        const pdf = (event.target as IDBRequest).result;
        if (pdf) {
          const blob = new Blob([pdf.data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          window.open(url);
        } else {
          console.log("PDF not found in the database.");
        }
      };

      request.onerror = function (event) {
        console.error(
          "Error retrieving PDF:",
          (event.target as IDBRequest).error?.message
        );
      };
    });
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <button onClick={getPDF}>View PDF</button>
    </div>
  );
};

export default PDFUploader;
