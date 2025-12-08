import React from "react";

const statsTop = [
  { label: "Total Income", value: "0 INR", color: "bg-blue-500" },
  { label: "Withdrawal", value: "0 INR", color: "bg-amber-400" },
  { label: "Balance", value: "0 INR", color: "bg-red-500" },
  { label: "Freadom(Pool) Income", value: "0 INR", color: "bg-emerald-500" },
  { label: "Daily Bonus Income", value: "0 INR", color: "bg-emerald-500" },
  { label: "Rank Reward Income", value: "0 INR", color: "bg-emerald-500" },
];

const statsBottom = [
  { label: "Repurchase Income", value: "0 INR" },
  { label: "Today Active", value: "0" },
  { label: "Today InActive", value: "0" },
  { label: "Today Total Id", value: "0" },
  { label: "Total User", value: "0" },
  { label: "Total Active User", value: "0" },
  { label: "Total InActive User", value: "0" },
  { label: "Total Direct", value: "0" },
  { label: "Total Direct Active", value: "0" },
  { label: "Total Direct InActive", value: "0" },
];

function DashBoardPage() {
  return (
    <div className="min-h-full bg-white">
      {/* Top blue bar */}
      <div className="bg-sky-600 text-center text-white text-sm py-2">
        सपनों की दुनिया को वास्तविकता में बदलने जा रहा।
      </div>

      {/* Activation text */}
      <div className="text-center text-red-600 text-sm mt-2 cursor-pointer">
        Click here to activate your account!
      </div>

      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* Congratulation card */}
        <div className="bg-white rounded shadow border border-gray-200 overflow-hidden">
          <div className="bg-red-500 text-white font-semibold text-center py-2">
            Congratulation!
          </div>
          <div className="bg-sky-500 text-white text-center py-6">
            <div className="text-xl font-semibold">Karan Yadav</div>
            <div className="mt-1 text-sm">WSE414890</div>
            <div className="mt-1 text-sm">Post</div>
            <div className="mt-4 text-xs">Joining Date: 30/11/2025</div>
            <div className="text-xs">Sponsor ID : WSE597116</div>
          </div>
        </div>

        {/* Top stats grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statsTop.map((item) => (
            <div
              key={item.label}
              className={`${item.color} text-white rounded shadow p-4 flex flex-col justify-center cursor-pointer hover:brightness-110`}
            >
              <div className="text-xs opacity-90">{item.label}</div>
              <div className="mt-2 text-lg font-semibold">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Bottom stats grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statsBottom.map((item) => (
            <div
              key={item.label}
              className="bg-sky-500 text-white rounded shadow p-4 flex flex-col justify-center cursor-pointer hover:brightness-110"
            >
              <div className="text-xs opacity-90">{item.label}</div>
              <div className="mt-2 text-lg font-semibold">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashBoardPage;
