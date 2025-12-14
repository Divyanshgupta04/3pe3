import React, { useState, useEffect } from "react";

import ActivateID from "./ActivateID";
import TeamBusiness from "./MyTeamBusiness/TeamBusiness";
import RankRewardBusiness from "./MyTeamBusiness/RankRewardBusiness";
import FreedomBusiness from "./MyTeamBusiness/FreedomBusiness";
import EditProfile from "./EditProfile";
import EditBankDetail from "./Editbankdetail";
import ImageUpload from "./Imageuploader";
import IncomeReport from "./IncomeReport"; // ✅ Added
import Withdraw from "./Withdraw";
import TransferPin from "./e-pin/TransferPin";
import TransferToUser from "./e-pin/TransferToUser";
import UsedPin from "./e-pin/UsedPin";

const API_BASE = "http://localhost:5000";

const DASHBOARD_ITEMS = [
  {
    label: "Profile",
    children: [
      { label: "Edit Profile" },
      { label: "KYC Upload" },
      { label: "Edit Password" },
      { label: "Edit Bank Details" },
      { label: "Welcome Letter" },
      { label: "Create ID Card" },
    ],
  },
  {
    label: "ePin",
    children: [
      { label: "Generate ePin" },
      { label: "ePin Transfer" },
      { label: "ePin Report" },
    ],
  },
  { label: "Active ID" },
  {
    label: "My Team Network",
    children: [
      { label: "Direct Team" },
      { label: "Level-wise Team" },
      { label: "Genealogy View" },
    ],
  },
  {
    label: "My Team Business Support",
    children: [
      { label: "Team Business" },
      { label: "Rank Reward Business" },
      { label: "Freedom Business" },
    ],
  },
  {
    label: "Income / Reports",
    children: [
      { label: "Income Report" },
      { label: "Payout Report" },
      { label: "Wallet Ledger" },
    ],
  },
  { label: "Withdraw" },
];

export default function DashboardSidebar({
  open = true,
  onClose,
  children,
  onLoginClick,
  onRegisterClick,
}) {
  const [openParent, setOpenParent] = useState(null);
  const [activePanel, setActivePanel] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false
  );
  const [role, setRole] = useState(null);

  // Disable scrolling when sidebar is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow || "";

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      // load member role so we can show/hide ePin section
      if (open && token) {
        (async () => {
          try {
            const res = await fetch(`${API_BASE}/api/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) setRole(data.user?.role || "member");
          } catch (e) {
            // ignore
          }
        })();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
      setActivePanel(null);
      setOpenParent(null);
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setIsLoggedIn(false);
    if (onClose) onClose();
    window.location.reload();
  };

  const handleParentClick = (label, hasChildren) => {
    if (hasChildren) {
      setOpenParent((prev) => (prev === label ? null : label));
    } else {
      if (label === "Active ID") setActivePanel("activate-id");
      if (label === "Active ID") {
        setActivePanel("activate-id");
      } else if (label === "Withdraw") {
        setActivePanel("withdraw");
      } else {
        console.log("Clicked parent:", label);
      }
    }
  };

  const handleChildClick = (parentLabel, childLabel) => {
    // Profile Pages
    if (parentLabel === "Profile") {
      if (childLabel === "Edit Profile") return setActivePanel("edit-profile");
      if (childLabel === "KYC Upload") return setActivePanel("kyc-upload");
      if (childLabel === "Edit Bank Details")
        return setActivePanel("edit-bank-details");
      return setActivePanel(null);
    }

    if (parentLabel === "ePin") {
      if (childLabel === "Generate ePin") return setActivePanel("epin-generate");
      if (childLabel === "ePin Transfer") return setActivePanel("epin-transfer");
      if (childLabel === "ePin Report") return setActivePanel("epin-report");
      return setActivePanel(null);
    }

    if (parentLabel === "My Team Business Support") {
      if (childLabel === "Team Business") return setActivePanel("team-business");
      if (childLabel === "Rank Reward Business")
        return setActivePanel("rank-reward-business");
      if (childLabel === "Freedom Business")
        return setActivePanel("freedom-business");
      return setActivePanel(null);
    }

    // Income / Reports
    if (parentLabel === "Income / Reports") {
      if (childLabel === "Income Report") return setActivePanel("income-report");
      if (childLabel === "Payout Report") return setActivePanel("payout-report");
      if (childLabel === "Wallet Ledger") return setActivePanel("wallet-ledger");
      return setActivePanel(null);
    }

    setActivePanel(null);
  };

  // Right panel renderer
  const renderRightPanelContent = () => {
    if (activePanel === "activate-id") return <ActivateID compact />;

    // Profile
    if (activePanel === "edit-profile") return <EditProfile />;
    if (activePanel === "kyc-upload") return <ImageUpload />;
    if (activePanel === "edit-bank-details") return <EditBankDetail />;

    // Withdraw
    if (activePanel === "withdraw") return <Withdraw />;

    // ePin
    if (activePanel === "epin-generate") return <TransferPin />;
    if (activePanel === "epin-transfer") return <TransferToUser />;
    if (activePanel === "epin-report") return <UsedPin />;

    // Business Support
    if (activePanel === "team-business") return <TeamBusiness />;
    if (activePanel === "rank-reward-business") return <RankRewardBusiness />;
    if (activePanel === "freedom-business") return <FreedomBusiness />;

    // Income Pages
    if (activePanel === "income-report") return <IncomeReport />;
    if (activePanel === "payout-report")
      return <div className="p-4">Payout Report Coming Soon</div>;
    if (activePanel === "wallet-ledger")
      return <div className="p-4">Wallet Ledger Coming Soon</div>;

    return children || null;
  };

  const canSeeEpin = isLoggedIn && role === "franchise";
  const visibleItems = canSeeEpin
    ? DASHBOARD_ITEMS
    : DASHBOARD_ITEMS.filter((i) => i.label !== "ePin");

  // If user was on ePin section and role becomes non-franchise, kick them out
  useEffect(() => {
    if (!canSeeEpin && openParent === "ePin") setOpenParent(null);
  }, [canSeeEpin, openParent]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-800">
          <span className="text-sm font-semibold uppercase">Member Menu</span>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-800 text-xl"
          >
            ×
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 md:py-4 space-y-1 text-xs sm:text-sm">
          {visibleItems.map((item) => {
            const isOpen = openParent === item.label;
            const hasChildren = !!item.children?.length;

            return (
              <div key={item.label} className="space-y-1">
                <button
                  onClick={() => handleParentClick(item.label, hasChildren)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-800/60 transition"
                >
                  <span>{item.label}</span>

                  {hasChildren && (
                    <span
                      className={`text-xs opacity-70 transform transition-transform ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    >
                      ›
                    </span>
                  )}
                </button>

                {/* Children */}
                {hasChildren && isOpen && (
                  <div className="pl-4 space-y-1">
                    {item.children.map((child) => (
                      <button
                        key={child.label}
                        onClick={() =>
                          handleChildClick(item.label, child.label)
                        }
                        className="w-full text-left rounded-md px-3 py-1.5 text-[13px] bg-slate-900/40 hover:bg-slate-800/80 transition"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 px-4 py-4">
          <div className="flex gap-2">
            {isLoggedIn ? (
              <button
                className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className="flex-1 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2 text-sm text-white"
                  onClick={onRegisterClick}
                >
                  Register
                </button>

                <button
                  className="flex-1 rounded-lg border border-slate-500/70 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
                  onClick={onLoginClick}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Right panel */}
      <section className="fixed inset-y-0 left-72 right-0 z-40 bg-slate-950/95 text-slate-50 border-l border-slate-800 overflow-y-auto p-4 md:p-6">
        {renderRightPanelContent()}
      </section>
    </>
  );
}
