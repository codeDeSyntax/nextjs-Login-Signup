'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Home() {
  const [previewSource, setPreviewSource] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!previewSource) return;
    try {
      const res = await axios.post('/api/upload', { data: previewSource });
      setUploadedImage(res.data.url);
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmitFile}>
        <input type="file" name="image" onChange={handleFileInputChange} />
        <button type="submit">Submit</button>
      </form>
      {previewSource && <Image src={previewSource} alt="chosen" height={300} width={300} />}
      {uploadedImage && <Image src={uploadedImage} alt="uploaded" height={300} width={300} />}
    </div>
  );
}
