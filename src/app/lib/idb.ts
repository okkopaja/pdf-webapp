// Type definitions
interface PDFFile {
  name: string;
  file: File;
}

// Open the IndexedDB database
export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('pdfDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('pdfs')) {
        db.createObjectStore('pdfs', { keyPath: 'name' });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject('Failed to open the database: ' + (event.target as IDBOpenDBRequest).error?.message);
    };
  });
}

// Save a PDF file
export function savePDF(name: string, file: File): Promise<string> {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['pdfs'], 'readwrite');
      const store = transaction.objectStore('pdfs');
      const request = store.add({ name, file } as PDFFile);

      request.onsuccess = () => {
        resolve('PDF saved successfully');
      };

      request.onerror = (event) => {
        reject('Failed to save PDF: ' + (event.target as IDBRequest).error?.message);
      };
    });
  });
}

// Retrieve a PDF file by name
export function getPDF(name: string): Promise<PDFFile | undefined> {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['pdfs'], 'readonly');
      const store = transaction.objectStore('pdfs');
      const request = store.get(name);

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest<PDFFile>).result);
      };

      request.onerror = (event) => {
        reject('Failed to retrieve PDF: ' + (event.target as IDBRequest).error?.message);
      };
    });
  });
}
