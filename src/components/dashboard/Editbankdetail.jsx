import React, { useState } from "react";

const App = () => {
  const [form, setForm] = useState({
    accountHolder: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    branchName: "",
  });

  // input change handler
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmit = () => {
    console.log("Bank Details:", form);
    alert("Bank details updated successfully!");
  };

  // cancel (reset form)
  const handleCancel = () => {
    setForm({
      accountHolder: "",
      bankName: "",
      accountNo: "",
      ifsc: "",
      branchName: "",
    });
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[90%] sm:w-[60%] md:w-[40%] bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold mb-6">Edit Bank Details</h1>

        {/* Account Holder */}
        <label className="text-gray-700 font-medium">Account Holder</label>
        <input
          type="text"
          name="accountHolder"
          value={form.accountHolder}
          onChange={handleChange}
          placeholder="Enter Account Holder Name"
          className="w-full mt-2 mb-5 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Bank Name */}
        <label className="text-gray-700 font-medium">Bank Name</label>
        <input
          type="text"
          name="bankName"
          value={form.bankName}
          onChange={handleChange}
          placeholder="Enter Bank Name"
          className="w-full mt-2 mb-5 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Account Number */}
        <label className="text-gray-700 font-medium">Account Number</label>
        <input
          type="number"
          name="accountNo"
          value={form.accountNo}
          onChange={handleChange}
          placeholder="Enter Account Number"
          className="w-full mt-2 mb-5 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* IFSC */}
        <label className="text-gray-700 font-medium">IFSC Code</label>
        <input
          type="text"
          name="ifsc"
          value={form.ifsc}
          onChange={handleChange}
          placeholder="Enter IFSC Code"
          className="w-full mt-2 mb-5 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Branch Name */}
        <label className="text-gray-700 font-medium">Branch Name</label>
        <input
          type="text"
          name="branchName"
          value={form.branchName}
          onChange={handleChange}
          placeholder="Enter Branch Name"
          className="w-full mt-2 mb-7 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
            onClick={handleSubmit}
          >
            Update
          </button>

          <button
            className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default App;