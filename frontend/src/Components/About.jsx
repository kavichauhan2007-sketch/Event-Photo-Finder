import React from 'react';
import { Cpu, Layers, Zap, Shield, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function About() {
  return (
    <div className="apollo-grid-bg min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Biometric Vision Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How EventSnap AI Indexes & Retrieves Faces
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A look into the underlying deep learning metric system that powers fast, sub-second facial similarity matching across unconstrained event photography.
          </p>
        </div>

        {/* Technical Architecture Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Metric Learning</span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              From Pixel Rasters to 512-Dimensional Manifolds
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Standard image search relies on metadata, tags, or crude color histograms. EventSnap AI implements <strong>InsightFace Buffalo_L</strong>, a state-of-the-art deep residual network.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              First, RetinaFace locates 5 primary facial landmarks (eyes, nose, mouth corners) with affine alignment. Then, an ArcFace-trained ResNet backbone projects the aligned face into a unit hypersphere vector with 512 floating-point dimensions.
            </p>
          </div>

          <div className="apollo-card p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
              Pipeline Stages
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 flex items-start gap-3">
                <div className="p-2 bg-amber-400/10 text-amber-400 rounded-lg shrink-0">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">1. RetinaFace Detection</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Detects multi-scale bounding boxes and 2D facial landmarks in complex group photos.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 flex items-start gap-3">
                <div className="p-2 bg-sky-400/10 text-sky-400 rounded-lg shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">2. Feature Normalization</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Generates calibrated L2-normalized 512-D vectors representing invariant facial geometry.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 flex items-start gap-3">
                <div className="p-2 bg-emerald-400/10 text-emerald-400 rounded-lg shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">3. Vector Cosine Matching</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Calculates dot-product cosine distances against all indexed event photos in &lt; 200ms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="apollo-card p-8 rounded-2xl border border-slate-700/60 bg-gradient-to-r from-slate-900/80 to-slate-950/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Shield className="w-4 h-4" />
                <span>Zero Selfie Retention Commitment</span>
              </div>
              <h3 className="text-xl font-bold text-white">Privacy by Mathematical Design</h3>
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                We never store attendee query selfies. Query images are passed directly into ephemeral memory, converted to mathematical feature vectors, and immediately deleted.
              </p>
            </div>
            <NavLink
              to="/"
              className="btn-apollo-primary px-5 py-2.5 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1.5"
            >
              <span>Try Query Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  );
}