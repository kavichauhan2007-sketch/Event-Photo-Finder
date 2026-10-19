import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="apollo-grid-bg min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Developer & Enterprise Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Engineering
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Questions regarding event deployments, custom API integration, or enterprise photo indexing? Send us a note.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="apollo-card p-6 sm:p-8 rounded-2xl border border-white/[0.08] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Direct Communication</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email</p>
                    <a href="mailto:kavichauhan2007@gmail.com" className="text-xs font-medium text-white hover:text-amber-400 transition">
                      kavichauhan2007@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Location</p>
                    <p className="text-xs font-medium text-white">New Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2">Social Profiles</p>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/kavichauhan2007-sketch"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tushar-chauhan-327633331"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="apollo-card p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
            <h2 className="text-lg font-bold text-white mb-4">Send a Message</h2>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Inquiry Received</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Thank you! Our engineering team will review your message and reply promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="work.email@domain.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Event integration / API query"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Details about your requirements..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-apollo-primary w-full py-2.5 rounded-lg text-xs font-bold tracking-wide uppercase flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;