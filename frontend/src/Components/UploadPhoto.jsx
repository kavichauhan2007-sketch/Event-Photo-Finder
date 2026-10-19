import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  FolderPlus,
  RefreshCw,
  Trash2,
  FileCheck,
  Database
} from 'lucide-react';

const UploadPhotos = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [eventName, setEventName] = useState('');
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState(null);

  const handleFiles = (newFilesList) => {
    const selected = Array.from(newFilesList).filter(f => f.type.startsWith('image/'));
    if (selected.length === 0) return;

    setErrorMessage('');
    const updatedFiles = [...files, ...selected];
    setFiles(updatedFiles);

    const newPreviews = selected.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2)
    }));

    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleFileChange = (e) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    const fileToRemove = previews[index];
    if (fileToRemove) URL.revokeObjectURL(fileToRemove.url);
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    previews.forEach(p => URL.revokeObjectURL(p.url));
    setPreviews([]);
    setFiles([]);
  };

  const handleUpload = async () => {
    if (!eventName.trim()) {
      setErrorMessage('Please specify an event repository name.');
      return;
    }

    if (files.length === 0) {
      setErrorMessage('Please select at least one photograph to index.');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    setUploadProgress(15);

    const formData = new FormData();
    formData.append('event_name', eventName.trim());
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const progressTimer = setInterval(() => {
        setUploadProgress(prev => (prev < 90 ? prev + 15 : prev));
      }, 500);

      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressTimer);
      setUploadProgress(100);

      const data = await response.json();

      if (response.ok && data.success !== false) {
        setSuccessData({
          eventName: eventName.trim(),
          count: data.uploaded_count || files.length,
          photos: data.uploaded || []
        });
        clearAllFiles();
      } else {
        setErrorMessage(data.message || 'Upload failed. Please check server status.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error: Could not reach backend engine on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apollo-grid-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span>Event Ingestion & Facial Vector Pipeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Host Event Gallery
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Upload bulk event photography. Our neural engine automatically indexes each detected face into high-dimensional embeddings for attendee search.
          </p>
        </div>

        {/* Main Console */}
        <div className="apollo-card rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
          {successData ? (
            /* Success State */
            <div className="text-center py-10 space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Event Gallery Ingested</h2>
                <p className="text-slate-300 text-sm mt-1">
                  Successfully stored and indexed <span className="text-amber-400 font-bold">{successData.count} photos</span> for{' '}
                  <span className="font-semibold text-white">"{successData.eventName}"</span>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    navigate('/Gallery', {
                      state: {
                        eventName: successData.eventName,
                        photoMode: 'all',
                        matches: successData.photos.map(p => p.url)
                      }
                    });
                  }}
                  className="btn-apollo-primary px-5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Explore Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setSuccessData(null);
                    setEventName('');
                  }}
                  className="px-4 py-2.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                >
                  Upload Another Batch
                </button>
              </div>
            </div>
          ) : (
            /* Upload Form */
            <div className="space-y-6">
              
              {/* Event Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-200">
                  Event Identifier <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. Wedding Ceremony, Tech Hackathon 2026, Convocation"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/70 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Dropzone */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">
                    Source Photographs <span className="text-amber-400">*</span>
                  </span>
                  {files.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllFiles}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear Selection ({files.length})</span>
                    </button>
                  )}
                </div>

                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="border border-dashed border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/80 rounded-xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2.5"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Drop event photo archives or click to select files
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Accepts multiple high-resolution JPG, PNG, and WebP images.
                    </p>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery Preview */}
              {previews.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Selected Files ({previews.length})</span>
                    <span>Total Size: {previews.reduce((acc, curr) => acc + parseFloat(curr.size), 0).toFixed(2)} MB</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 max-h-56 overflow-y-auto p-2 bg-slate-900/70 rounded-xl border border-slate-800">
                    {previews.map((item, index) => (
                      <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 hover:bg-red-600 text-white transition opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 px-1 py-0.5 text-[8px] text-slate-300 truncate font-mono">
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {loading && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-amber-300 font-mono">
                    <span>Ingesting images and extracting face embeddings...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleUpload}
                disabled={loading || files.length === 0}
                className={`btn-apollo-primary w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 ${
                  loading || files.length === 0 ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2 text-slate-950 font-bold">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Indexing Event Photos...</span>
                  </div>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    <span>Ingest & Index {files.length > 0 ? `${files.length} Photos` : 'Gallery'}</span>
                  </>
                )}
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UploadPhotos;