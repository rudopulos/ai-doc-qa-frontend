import React, { useState } from 'react';
import axios from 'axios';

const UploadDocument = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('document', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to process document.');
            console.error('Error uploading document:', error);
        }
    };

    return (
        <div>
            <h1>Upload Document</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadDocument;
