import React, { useState } from 'react';
import { Download, Maximize2, Sparkles, Check } from 'lucide-react';

const Card = ({ src, score, filename, onOpenLightbox }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || `event-photo-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (err) {
      window.open(src, '_blank');
    }
  };

  return (
    <div 
      onClick={() => onOpenLightbox && onOpenLightbox(src, score)}
      className="group relative rounded-xl overflow-hidden apollo-card cursor-pointer border border-white/[0.08] hover:border-amber-400/50 transition-all flex flex-col"
    >
      {/* Match Confidence Tag */}
      {score !== undefined && (
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-tight bg-slate-900/90 border border-amber-400/40 text-amber-300 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>{score}% Match</span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-slate-700 border-t-amber-400 animate-spin"></div>
          </div>
        )}

        <img
          src={src}
          alt={filename || "Event photo"}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
          <span className="text-[11px] text-slate-300 font-mono truncate max-w-[140px]">
            {filename || "photo.jpg"}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleDownload}
              title="Download High-Res Original"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md transition-colors"
            >
              {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => onOpenLightbox && onOpenLightbox(src, score)}
              title="Expand Preview"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
