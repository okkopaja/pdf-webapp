'use client';

import { useState } from 'react';

export default function Home() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert('File uploaded successfully');
        } else {
            alert('File upload failed');
        }
    };

    return (
        <div>
            <h1>Upload PDF</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="application/pdf" />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
