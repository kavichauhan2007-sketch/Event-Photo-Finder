import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Search, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  Sliders,
  Images,
  Cpu,
  Shield,
  Zap,
  Sparkles,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Core State
  const [eventName, setEventName] = useState('');
  const [photoMode, setPhotoMode] = useState('mine'); // 'mine' or 'all'
  const [selfieFile, setSelfieFile] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const [threshold, setThreshold] = useState(0.52);

  // UI State
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [availableEvents, setAvailableEvents] = useState([]);

  // Load existing events from backend on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/events');
      if (res.ok) {
        const data = await res.json();
        const evList = data.events || [];
        setAvailableEvents(evList);
        if (evList.length > 0 && !eventName) {
          setEventName(evList[0].name);
        }
      }
    } catch (e) {
      console.log('Backend not reachable:', e);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelfieFile(file);
      setErrorMessage('');
      const url = URL.createObjectURL(file);
      setSelfiePreview(url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelfieFile(file);
      setErrorMessage('');
      const url = URL.createObjectURL(file);
      setSelfiePreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!eventName.trim()) {
      setErrorMessage('Please select or specify an event repository name.');
      return;
    }

    if (photoMode === 'mine' && !selfieFile) {
      setErrorMessage('Please provide a reference selfie to initiate facial recognition.');
      return;
    }

    setLoading(true);
    setStatusMessage('Connecting to InsightFace biometric worker...');

    const formData = new FormData();
    formData.append('event_name', eventName.trim());
    formData.append('photo_mode', photoMode);
    formData.append('threshold', threshold.toString());

    if (photoMode === 'mine' && selfieFile) {
      formData.append('file', selfieFile);
    }

    try {
      setTimeout(() => setStatusMessage('Detecting landmarks & generating 512-D embedding...'), 600);
      setTimeout(() => setStatusMessage('Computing normalized cosine similarity across gallery...'), 1400);

      const response = await fetch('http://127.0.0.1:8000/get_similar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        setErrorMessage(data.message || 'Search failed. Please verify the event name or photo quality.');
        setLoading(false);
        return;
      }

      // Transition to results gallery
      navigate('/Gallery', {
        state: {
          eventName: data.event_name || eventName,
          photoMode: photoMode,
          match: data.matches || [],
          detailedMatches: data.detailed_matches || [],
          totalPhotos: data.total_event_photos || (data.matches ? data.matches.length : 0),
        },
      });
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to connect to backend engine at http://127.0.0.1:8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apollo-grid-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Section - Apollo Style */}
        <div className="text-center space-y-5 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Biometric Visual Graph Engine • Sub-200ms Retrieval</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Instant Event Photo Search, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-sky-300">
              Powered by Biometric AI.
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Eliminate hours of manual gallery browsing. Upload a single reference selfie to automatically match and extract every high-resolution photo of you from festivals, conferences, and weddings.
          </p>

          {/* Metric Bar */}
          <div className="pt-2 flex items-center justify-center flex-wrap gap-8 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>512-D ArcFace Vectors</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-sky-400" />
              <span>&lt; 200ms Query Latency</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Zero Selfie Storage</span>
            </div>
          </div>
        </div>

        {/* Central Search Console - Apollo Clean Form Design */}
        <div className="max-w-2xl mx-auto apollo-card rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-900/80 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setPhotoMode('mine')}
                className={`py-2.5 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  photoMode === 'mine'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Find My Photos (Selfie)</span>
              </button>

              <button
                type="button"
                onClick={() => setPhotoMode('all')}
                className={`py-2.5 px-4 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  photoMode === 'all'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Images className="w-3.5 h-3.5" />
                <span>Browse Entire Event</span>
              </button>
            </div>

            {/* Event Name Input with Available Tags */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-200">
                  Target Event Name
                </label>
                <span className="text-slate-400">Select or type custom event</span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. Annual Tech Gala 2026"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/70 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Event Chips */}
              {availableEvents.length > 0 && (
                <div className="pt-1 flex items-center flex-wrap gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">Available:</span>
                  {availableEvents.map((ev) => (
                    <button
                      key={ev.name}
                      type="button"
                      onClick={() => setEventName(ev.name)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition ${
                        eventName === ev.name
                          ? 'bg-amber-400/10 border-amber-400/40 text-amber-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {ev.name} <span className="opacity-60 text-[10px]">({ev.photo_count})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selfie Ingestion Section (Only in 'mine' mode) */}
            {photoMode === 'mine' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Reference Selfie Photo</span>
                  <span className="text-slate-400">Front-facing portrait</span>
                </div>

                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className={`border border-dashed rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center ${
                    selfiePreview
                      ? 'border-amber-400/60 bg-amber-950/10'
                      : 'border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-900'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {selfiePreview ? (
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-amber-400/50 p-0.5 shrink-0 bg-slate-950">
                        <img
                          src={selfiePreview}
                          alt="Selfie"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-x-0 h-0.5 bg-amber-400 animate-scan-bar"></div>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          Selfie Vector Ready
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {selfieFile ? selfieFile.name : 'image.jpg'} • Click to replace
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-semibold text-slate-200">
                        Click to upload selfie or drag and drop
                      </p>
                      <p className="text-[11px] text-slate-500">
                        JPG, PNG, or WebP up to 10MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Accuracy / Threshold Slider */}
                <div className="p-3 bg-slate-900/40 rounded-xl border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      Confidence Threshold: {Math.round(threshold * 100)}%
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {threshold < 0.5 ? 'Broad Matches' : threshold > 0.6 ? 'Strict Matches' : 'Balanced Default'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.40"
                    max="0.68"
                    step="0.02"
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Apollo Primary Action Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn-apollo-primary w-full py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2 text-slate-950 font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{statusMessage}</span>
                </div>
              ) : (
                <>
                  <span>{photoMode === 'mine' ? 'Execute Facial Vector Search' : 'Open Event Gallery'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Technical Architecture Feature Cards - Apollo Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="apollo-card p-6 rounded-xl border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">ArcFace Metric Learning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maps unconstrained faces into normalized 512-D hyperspherical embeddings, providing robust invariant matching regardless of lighting, angles, or accessories.
            </p>
          </div>

          <div className="apollo-card p-6 rounded-xl border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/20 text-sky-400 flex items-center justify-center mb-3">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Transient In-Memory Compute</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero biometric data retention. Query selfies are processed purely in ephemeral RAM and instantly destroyed upon vector distance calculation.
            </p>
          </div>

          <div className="apollo-card p-6 rounded-xl border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center mb-3">
              <FolderOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">High-Res CDN Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrates directly with ImageKit CDN and local edge storage to stream lossless, print-quality images directly to attendees with 1-click batch download.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
