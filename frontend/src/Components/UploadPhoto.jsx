import React, { useState } from "react";
import Navbar from "./Navbar";

const UploadPhotos = () => {
  const [eventName, setEventName] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!eventName.trim()) {
      alert("Please enter an event name.");
      return;
    }

    if (files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();

    formData.append("event_name", eventName);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Photos uploaded successfully!");
        console.log(data);

        setFiles([]);
        setEventName("");
      } else {
        alert(data.message || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <><Navbar />    <div className="min-h-screen bg-[rgba(98,43,209,0.16)]  flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Upload Event Photos
        </h1>

        {/* Event Name */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Event Name
          </label>

          <input
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Select Photos
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2  file:bg-indigo-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md file:cursor-pointer cursor-pointer"
          />

          <p className="mt-3 text-sm text-gray-500">
            {files.length} file(s) selected
          </p>
        </div>


        {files.length > 0 && (
          <div className="mb-6 max-h-40 overflow-y-auto border rounded-lg p-3">
            {files.map((file, index) => (
              <p key={index} className="text-sm text-gray-700 truncate">
                📷 {file.name}
              </p>
            ))}
          </div>
        )}


        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
            }`}
        >
          {loading ? "Uploading..." : "Upload Photos"}
        </button>
      </div>
    </div>
    </>

  );
};

export default UploadPhotos;