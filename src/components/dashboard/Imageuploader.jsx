import React, { useState } from "react";

const ImageUpload = () => {
  const [profile, setProfile] = useState(null);
  const [pan, setPan] = useState(null);
  const [aadhaar, setAadhaar] = useState(null);
  const [bank, setBank] = useState(null);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-white p-8 rounded-2xl shadow-sm">

        <h1 className="text-2xl font-semibold mb-8">Profile Image</h1>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Profile Image */}
          <div>
            <label className="font-medium text-gray-700">Profile Image</label>
            <div className="mt-3 h-40 w-full border-2 border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              {profile ? (
                <img src={URL.createObjectURL(profile)} className="h-full w-full object-cover rounded-xl" />
              ) : (
                "Preview"
              )}
            </div>
            <input
              type="file"
              className="mt-3"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>

          {/* PAN Image */}
          <div>
            <label className="font-medium text-gray-700">PAN Image</label>
            <div className="mt-3 h-40 w-full border-2 border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              {pan ? (
                <img src={URL.createObjectURL(pan)} className="h-full w-full object-cover rounded-xl" />
              ) : (
                "Preview"
              )}
            </div>
            <input
              type="file"
              className="mt-3"
              onChange={(e) => setPan(e.target.files[0])}
            />
          </div>

          {/* Aadhaar Image */}
          <div>
            <label className="font-medium text-gray-700">Aadhaar Image</label>
            <div className="mt-3 h-40 w-full border-2 border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              {aadhaar ? (
                <img src={URL.createObjectURL(aadhaar)} className="h-full w-full object-cover rounded-xl" />
              ) : (
                "Preview"
              )}
            </div>
            <input
              type="file"
              className="mt-3"
              onChange={(e) => setAadhaar(e.target.files[0])}
            />
          </div>
        </div>

        {/* BANK IMAGE - Full Width ALONE */}
        <div className="mt-10 w-[50%]">
          <label className="font-medium text-gray-700">Bank Image</label>
          <div className="mt-3 h-40 w-full border-2 border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
            {bank ? (
              <img src={URL.createObjectURL(bank)} className="h-full w-full object-cover rounded-xl" />
            ) : (
              "Preview"
            )}
          </div>
          <input
            type="file"
            className="mt-3"
            onChange={(e) => setBank(e.target.files[0])}
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex items-center gap-5">
          <button className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
            Submit
          </button>

          <button className="px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default ImageUpload;