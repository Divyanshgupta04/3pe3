import React, { useEffect, useState } from "react";

const topStatConfig = [
  { label: "Total Income", key: "totalIncome", color: "bg-blue-500" },
  { label: "Withdrawal", key: "withdrawal", color: "bg-amber-400" },
  { label: "Balance", key: "balance", color: "bg-red-500" },
  { label: "Freadom(Pool) Income", key: "freedomIncome", color: "bg-emerald-500" },
  { label: "Daily Bonus Income", key: "dailyBonusIncome", color: "bg-emerald-500" },
  { label: "Rank Reward Income", key: "rankRewardIncome", color: "bg-emerald-500" },
];

const bottomStatConfig = [
  { label: "Repurchase Income", key: "repurchaseIncome" },
  { label: "Today Active", key: "todayActive" },
  { label: "Today InActive", key: "todayInactive" },
  { label: "Today Total Id", key: "todayTotalId" },
  { label: "Total User", key: "totalUser" },
  { label: "Total Active User", key: "totalActiveUser" },
  { label: "Total InActive User", key: "totalInactiveUser" },
  { label: "Total Direct", key: "totalDirect" },
  { label: "Total Direct Active", key: "totalDirectActive" },
  { label: "Total Direct InActive", key: "totalDirectInactive" },
];

function DashBoardPage() {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;
        const data = await res.json();
        setUser(data.user);
        setCards(data.cards || {});
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      }
    })();
  }, []);

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
            <div className="text-xl font-semibold">
              {user ? user.name : "Member Name"}
            </div>
            <div className="mt-1 text-sm">
              {user?.id || "User ID"}
            </div>
            <div className="mt-1 text-sm">Post</div>
            <div className="mt-4 text-xs">
              Joining Date: {user?.createdAt ? user.createdAt.slice(0, 10) : "--/--/----"}
            </div>
            <div className="text-xs">
              Sponsor ID : {user?.sponsorId || "-"}
            </div>
            {user?.inviteCode && (
              <div className="mt-1 text-xs">
                Your Invite Code: <span className="font-semibold">{user.inviteCode}</span>
              </div>
            )}
          </div>
        </div>

        {/* Top stats grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topStatConfig.map((item) => (
            <div
              key={item.label}
              className={`${item.color} text-white rounded shadow p-4 flex flex-col justify-center cursor-pointer hover:brightness-110`}
            >
              <div className="text-xs opacity-90">{item.label}</div>
              <div className="mt-2 text-lg font-semibold">
                {cards ? `${cards[item.key] || 0} INR` : "0 INR"}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bottomStatConfig.map((item) => (
            <div
              key={item.label}
              className="bg-sky-500 text-white rounded shadow p-4 flex flex-col justify-center cursor-pointer hover:brightness-110"
            >
              <div className="text-xs opacity-90">{item.label}</div>
              <div className="mt-2 text-lg font-semibold">
                {/* for now these are placeholders; can be wired later */}
                {item.key === "repurchaseIncome" && cards
                  ? `${cards.totalIncome || 0} INR`
                  : item.value || "0"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashBoardPage;
