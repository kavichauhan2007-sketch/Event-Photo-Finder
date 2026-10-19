import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const faqs = [
  {
    question: "How does the facial recognition search operate?",
    answer:
      "When a reference selfie is supplied, our inference pipeline utilizes InsightFace Buffalo_L (RetinaFace for landmark detection and ArcFace for feature projection). It extracts an invariant 512-dimensional vector embedding and computes dot-product cosine distance against all pre-indexed event photos in under 200 milliseconds.",
  },
  {
    question: "Is attendee biometric data stored permanently?",
    answer:
      "No. Zero facial biometric vectors or selfie images of attendees are persisted on disk or database. Selfies are processed strictly in volatile memory during vector distance calculation and are immediately released from memory upon response completion.",
  },
  {
    question: "What occurs if someone is partially occluded or wearing glasses?",
    answer:
      "ArcFace deep metric training is specifically tuned on multi-angle, unconstrained in-the-wild datasets. Faces wearing optical glasses, sunglasses, hats, or positioned at up to 45-degree yaw angles match accurately with our calibrated 52% baseline threshold.",
  },
  {
    question: "How do photographers upload high-resolution event albums?",
    answer:
      "Photographers or administrators use the 'Host Event' portal to upload hundreds of high-resolution JPG/PNG images simultaneously. The ingestion worker parses faces in parallel, generates vectors, and synchronizes files with the CDN.",
  },
  {
    question: "Can I inspect the entire event gallery without uploading a selfie?",
    answer:
      "Yes. Simply switch the toggle to 'Browse Entire Event' on the home page or click 'Event Galleries' in the top navigation to view the complete public album without needing a reference photo.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="apollo-grid-bg min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Technical Documentation & FAQ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-sm">
            Everything you need to know about EventSnap AI's biometric pipeline and privacy standards.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="apollo-card rounded-xl border border-white/[0.08] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition"
                >
                  <span className="font-semibold text-sm text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="apollo-card p-6 rounded-xl border border-slate-800 text-center space-y-3">
          <h3 className="text-sm font-bold text-white">Need custom enterprise deployment or SLA?</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Contact our engineering team to discuss dedicated GPU clusters, private cloud instances, or white-labeling.
          </p>
          <NavLink
            to="/Contact"
            className="btn-apollo-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold"
          >
            <span>Contact Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

      </div>
    </div>
  );
}