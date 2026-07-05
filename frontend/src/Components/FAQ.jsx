import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How does Event Photo Finder work?",
    answer:
      "Upload a clear selfie, and our AI compares your facial features with photos from the selected event. Matching photos are then displayed for you to view or download.",
  },
  {
    question: "Is my selfie stored permanently?",
    answer:
      "No. Your selfie is only used to perform the search. Depending on the event organizer's settings, uploaded images may be automatically deleted after processing.",
  },
  {
    question: "How accurate is the photo search?",
    answer:
      "Our AI uses facial recognition and embedding comparison to provide highly accurate results. Accuracy may vary based on image quality, lighting, and face visibility.",
  },
  {
    question: "What types of events are supported?",
    answer:
      "Event Photo Finder works for weddings, college festivals, concerts, sports events, conferences, corporate events, birthday parties, and many other gatherings.",
  },
  {
    question: "Can I upload more than one selfie?",
    answer:
      "Yes. Uploading multiple clear selfies from different angles can improve matching accuracy.",
  },
  {
    question: "Who can upload event photos?",
    answer:
      "Photographers, event organizers, wedding studios, colleges, and administrators can upload event galleries for attendees to search.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We prioritize user privacy and use secure processing to protect uploaded images and event data.",
  },
  {
    question: "Can I download my photos?",
    answer:
      "Yes. If downloading is enabled by the event organizer, you can download your matched photos directly from the gallery.",
  },
];

function FAQItem({ faq, open, onClick }) {
  return (
    <div className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-5 text-left hover:bg-white/5 transition"
      >
        <h3 className="font-semibold text-lg">{faq.question}</h3>
        {open ? (
          <ChevronUp className="text-violet-400" />
        ) : (
          <ChevronDown className="text-violet-400" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 text-gray-400 leading-7">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold">
            Frequently Asked <span className="text-violet-500">Questions</span>
          </h1>

          <p className="text-gray-400 mt-5 text-lg">
            Everything you need to know about Event Photo Finder.
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              open={open === index}
              onClick={() => setOpen(open === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="mt-16 text-center bg-violet-600 rounded-3xl p-10">
          <h2 className="text-3xl font-bold">Still have questions?</h2>

          <p className="mt-4 text-violet-100">
            Contact us and we'll be happy to help you with anything related to
            Event Photo Finder.
          </p>

          <button className="mt-8 bg-white text-violet-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}