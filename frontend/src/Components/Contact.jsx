import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold">
            Contact <span className="text-violet-500">Us</span>
          </h1>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
            We'd love to hear from you! Whether you have a question, feedback,
            partnership opportunity, or want to collaborate on Event Photo
            Finder, feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
            <h2 className="text-3xl font-semibold mb-8">
              Get In Touch
            </h2>

            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="bg-violet-600 p-4 rounded-xl text-xl">
                  <FaEnvelope />
                </div>

                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="font-medium">
                    tusharchooudhary789987@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-violet-600 p-4 rounded-xl text-xl">
                  <FaPhone />
                </div>

                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="font-medium">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="bg-violet-600 p-4 rounded-xl text-xl">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="font-medium">India</p>
                </div>
              </div>
            </div>

   
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">
                Follow Us
              </h3>

              <div className="flex gap-4">
                <a
                  href="https://github.com/Tusharjast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-violet-600 transition p-4 rounded-xl text-2xl"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/tushar-choudhary-6514b8364/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-violet-600 transition p-4 rounded-xl text-2xl"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

      
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
            <h2 className="text-3xl font-semibold mb-8">
              Send a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-violet-500"
              ></textarea>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 bg-violet-600 hover:bg-violet-700 transition py-3 rounded-xl font-semibold"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} Event Photo Finder. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;