import { Camera, Search, ShieldCheck, Zap, Users, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 bg-violet-500/10 text-violet-400 px-4 py-2 rounded-full border border-violet-500/20">
            <Sparkles size={18} />
            AI-Powered Photo Search
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            About <span className="text-violet-500">Event Photo Finder</span>
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-400 leading-8">
            Event Photo Finder is an AI-powered platform that helps people
            instantly find their photos from weddings, college fests,
            conferences, sports events, concerts, and other gatherings.
            Instead of scrolling through thousands of images, simply upload a
            selfie and let our facial recognition technology find every photo
            that includes you.
          </p>
        </div>

        {/* Mission */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-5">Our Mission</h2>

            <p className="text-gray-400 leading-8">
              We believe event memories should be easy to access. Our goal is
              to simplify photo sharing by using AI to automatically locate
              people's photos, saving hours of manual searching for attendees
              and making photo delivery effortless for photographers and event
              organizers.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold mb-6">
              Why Event Photo Finder?
            </h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <Search className="text-violet-400" />
                <div>
                  <h4 className="font-semibold">Instant Search</h4>
                  <p className="text-gray-400">
                    Find your photos in seconds.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Zap className="text-violet-400" />
                <div>
                  <h4 className="font-semibold">Fast AI Matching</h4>
                  <p className="text-gray-400">
                    Facial recognition powered photo search.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldCheck className="text-violet-400" />
                <div>
                  <h4 className="font-semibold">Secure</h4>
                  <p className="text-gray-400">
                    Your uploaded images are processed securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <Camera className="text-violet-400 mb-5" size={40} />
              <h3 className="text-xl font-semibold mb-3">
                Upload a Selfie
              </h3>
              <p className="text-gray-400">
                Upload one clear selfie to begin searching your event photos.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <Search className="text-violet-400 mb-5" size={40} />
              <h3 className="text-xl font-semibold mb-3">
                AI Face Recognition
              </h3>
              <p className="text-gray-400">
                Our AI compares facial embeddings to find matching images with
                high accuracy.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <Users className="text-violet-400 mb-5" size={40} />
              <h3 className="text-xl font-semibold mb-3">
                Built for Events
              </h3>
              <p className="text-gray-400">
                Perfect for weddings, colleges, concerts, sports events,
                conferences, and corporate gatherings.
              </p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="mt-24 bg-violet-600 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>

          <p className="max-w-3xl mx-auto text-violet-100 leading-8">
            We aim to become the easiest way for photographers and event
            organizers to deliver personalized photo galleries. Our vision is
            to make finding event memories as simple as uploading a selfie.
          </p>
        </div>
      </div>
    </div>
  );
}