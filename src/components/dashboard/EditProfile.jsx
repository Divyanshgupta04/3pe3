import React from "react";

const EditProfile = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-10">
      <div className="w-[90%] md:w-[85%] lg:w-[75%] bg-white p-10 rounded-2xl shadow-sm">
        
        {/* SAME CODE THAT YOU SHARED */}
        {/* JUST RENAMED TO EditProfile */}

        {/* TOP HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-5">
            <img
              src="https://i.pravatar.cc/100"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">Karan Yadav</h2>
              <p className="text-gray-500 text-sm">karanyadav@gmail.com</p>
            </div>
          </div>

          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit
          </button>
        </div>

        {/* FORM SECTION */}
        {/* Full form same as you provided */}
        {/* ...paste your full form code here ... */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* USER ID */}
          <div>
            <label className="text-sm text-gray-600">User ID</label>
            <input 
              type="text" 
              defaultValue="W5E414890"
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input 
              type="text" 
              defaultValue=""
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <select className="w-full mt-2 p-3 bg-gray-100 border rounded-xl">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-sm text-gray-600">Address</label>
            <input 
              type="text" 
              defaultValue=""
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* MOBILE */}
          <div>
            <label className="text-sm text-gray-600">Mobile No</label>
            <input 
              type="text" 
              defaultValue=""
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input 
              type="email" 
              placeholder="Enter Email"
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* CITY */}
          <div>
            <label className="text-sm text-gray-600">City</label>
            <input 
              type="text" 
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
              placeholder="City"
            />
          </div>

          {/* STATE */}
          <div>
            <label className="text-sm text-gray-600">State</label>
            <input 
              type="text" 
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
              placeholder="State"
            />
          </div>

          {/* PIN CODE */}
          <div>
            <label className="text-sm text-gray-600">Pin Code</label>
            <input 
              type="number" 
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
              placeholder="Pin Code"
            />
          </div>

          {/* PAN */}
          <div>
            <label className="text-sm text-gray-600">PAN No</label>
            <input 
              type="text" 
              placeholder="PAN Number"
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* AADHAAR */}
          <div>
            <label className="text-sm text-gray-600">Aadhaar No</label>
            <input 
              type="number" 
              placeholder="Aadhaar Number"
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* NOMINEE */}
          <div>
            <label className="text-sm text-gray-600">Nominee Name</label>
            <input 
              type="text" 
              placeholder="Nominee Name"
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* RELATION */}
          <div>
            <label className="text-sm text-gray-600">Relation</label>
            <input 
              type="text" 
              placeholder="Relation"
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* AGE */}
          <div>
            <label className="text-sm text-gray-600">Age</label>
            <input 
              type="number" 
              defaultValue={0}
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* UPI NO */}
          <div>
            <label className="text-sm text-gray-600">UPI No</label>
            <input 
              type="text" 
              placeholder="UPI Number"
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>

          {/* UPI ID */}
          <div>
            <label className="text-sm text-gray-600">UPI ID</label>
            <input 
              type="text" 
              placeholder="UPI ID"
              className="w-full mt-2 p-3 bg-gray-100 border rounded-xl"
            />
          </div>
        </div>

        {/* UPDATE BUTTON */}
        <div className="mt-12">
          <button className="w-full md:w-auto px-10 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Update
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;