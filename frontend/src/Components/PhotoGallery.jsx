import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  SlidersHorizontal,
  CheckCircle,
  FolderOpen
} from 'lucide-react';

const PhotoGallery = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely extract router state
  const state = location.state || {};
  const [eventName, setEventName] = useState(state.eventName || state.event_name || 'Event Gallery');
  const [photoMode, setPhotoMode] = useState(state.photoMode || 'mine');
  
  const rawMatches = state.match || state.matches || [];
  const detailedMatches = state.detailedMatches || state.detailed_matches || [];

  const [photosList, setPhotosList] = useState([]);
  const [filterThreshold, setFilterThreshold] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (detailedMatches.length > 0) {
      setPhotosList(detailedMatches);
    } else if (rawMatches.length > 0) {
      setPhotosList(rawMatches.map(url => ({ url, score: undefined })));
    } else {
      fetchFallbackPhotos();
    }
  }, [location.state]);

  const fetchFallbackPhotos = async () => {
    setLoading(true);
    try {
      const evRes = await fetch('http://127.0.0.1:8000/events');
      const evData = await evRes.json();
      const events = evData.events || [];
      if (events.length > 0) {
        const targetEvent = events[0].name;
        setEventName(targetEvent);
        setPhotoMode('all');

        const formData = new FormData();
        formData.append('event_name', targetEvent);
        formData.append('photo_mode', 'all');

        const simRes = await fetch('http://127.0.0.1:8000/get_similar', {
          method: 'POST',
          body: formData,
        });
        const simData = await simRes.json();
        const matches = simData.detailed_matches || (simData.matches || []).map(url => ({ url }));
        setPhotosList(matches);
      }
    } catch (e) {
      console.error('Failed to load gallery:', e);
    } finally {
      setLoading(false);
    }
  };

  const filteredPhotos = photosList.filter(item => {
    if (!filterThreshold || item.score === undefined) return true;
    return item.score >= filterThreshold;
  });

  const openLightbox = (url) => {
    const idx = filteredPhotos.findIndex(p => p.url === url);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null && lightboxIndex < filteredPhotos.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos]);

  return (
    <div className="apollo-grid-bg min-h-screen pb-24 text-white">
      {/* Top Header - Apollo Style Breadcrumb & Control Bar */}
      <div className="border-b border-white/[0.08] bg-[#07090e]/90 backdrop-blur-md sticky top-18 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Breadcrumbs & Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
                title="Return to Search"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <span>Events</span>
                  <span>/</span>
                  <span className="text-amber-400 font-semibold">{eventName}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700/60">
                    {photoMode === 'mine' ? 'Facial Match' : 'Full Archive'}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                  {filteredPhotos.length} {filteredPhotos.length === 1 ? 'Photograph' : 'Photographs'} Retrieved
                </h1>
              </div>
            </div>

            {/* Filter Pills & Actions */}
            <div className="flex items-center flex-wrap gap-2.5">
              {photoMode === 'mine' && photosList.some(p => p.score !== undefined) && (
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
                  <button
                    onClick={() => setFilterThreshold(0)}
                    className={`px-3 py-1 rounded-md font-medium transition ${
                      filterThreshold === 0 ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Matches
                  </button>
                  <button
                    onClick={() => setFilterThreshold(75)}
                    className={`px-3 py-1 rounded-md font-medium transition ${
                      filterThreshold === 75 ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    High Confidence (&gt;75%)
                  </button>
                </div>
              )}

              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Another Face</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-amber-400 animate-spin mb-4"></div>
            <p className="text-slate-400 text-xs font-mono">Running vector similarity calculations...</p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-20 px-6 apollo-card rounded-2xl border border-white/10 my-8">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1.5">No Matching Faces Found</h3>
            <p className="text-slate-400 text-xs mb-6 leading-relaxed">
              We couldn't detect a matching face with the selected threshold in <span className="text-slate-200 font-semibold">{eventName}</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <button
                onClick={() => navigate('/')}
                className="btn-apollo-primary px-4 py-2 rounded-lg text-xs font-bold"
              >
                Try Another Selfie
              </button>
              <button
                onClick={() => {
                  setPhotoMode('all');
                  setFilterThreshold(0);
                  fetchFallbackPhotos();
                }}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                View Full Event Gallery
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPhotos.map((item, idx) => (
              <Card
                key={idx}
                src={item.url}
                score={item.score}
                filename={item.filename || `photo-${idx + 1}.jpg`}
                onOpenLightbox={openLightbox}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div 
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition z-50"
          >
            <X className="w-5 h-5" />
          </button>

          {lightboxIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white transition z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {lightboxIndex < filteredPhotos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white transition z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center relative"
          >
            <img
              src={filteredPhotos[lightboxIndex].url}
              alt="Preview"
              className="max-h-[75vh] max-w-full rounded-xl shadow-2xl object-contain border border-white/10 bg-slate-950"
            />

            <div className="mt-3 flex items-center justify-between w-full px-2 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="font-mono text-white">
                  Photo {lightboxIndex + 1} of {filteredPhotos.length}
                </span>
                {filteredPhotos[lightboxIndex].score !== undefined && (
                  <span className="px-2 py-0.5 rounded-md font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {filteredPhotos[lightboxIndex].score}% Face Match
                  </span>
                )}
              </div>

              <a
                href={filteredPhotos[lightboxIndex].url}
                target="_blank"
                rel="noreferrer"
                download
                className="btn-apollo-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                Download Original
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
