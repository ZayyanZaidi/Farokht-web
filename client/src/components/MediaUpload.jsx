import { useRef, useState } from 'react';
import { uploadMedia } from '../utils/api';
import './MediaUpload.css';

export default function MediaUpload({ label, onUploaded, accept = 'image/*,video/*' }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const result = await uploadMedia(file);
      onUploaded(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="media-upload">
      <span className="media-upload-label">{label}</span>
      <button
        type="button"
        className="media-upload-btn"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Uploading…' : 'Choose file'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        hidden
      />
      {error && <p className="media-upload-error">{error}</p>}
    </div>
  );
}
