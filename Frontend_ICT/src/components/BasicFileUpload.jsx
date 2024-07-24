import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const BasicFileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
    console.log(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files[]', file);
    });

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Network response was not ok.');
      alert('Files uploaded successfully.');
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Files</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Choose files</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>
        <Button type="submit" variant="primary">
          Upload Files
        </Button>
      </Form>
    </div>
  );
};

export default BasicFileUpload;
