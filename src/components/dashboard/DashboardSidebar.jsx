import React, { useState, useEffect } from "react";

import ActivateID from "./ActivateID";
import TeamBusiness from "./MyTeamBusiness/TeamBusiness";
import RankRewardBusiness from "./MyTeamBusiness/RankRewardBusiness";
import FreedomBusiness from "./MyTeamBusiness/FreedomBusiness";
import EditProfile from "./EditProfile";
import EditBankDetail from "./Editbankdetail";
import ImageUpload from "./Imageuploader";

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
];

export default function DashboardSidebar({
  open = true,
  onClose,
  children,
  onLoginClick,
  onRegisterClick,
}) {
  const [openParent, setOpenParent] = useState(null);
  const [activePanel, setActivePanel] = useState(null); // e.g., 'activate-id', 'team-business', etc.
  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false
  );

  // Prevent background scrolling when the sidebar is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow || "";

    // Check auth status whenever sidebar is opened/closed
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
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

  if (!open) return null;

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setIsLoggedIn(false);
    // Close sidebar and refresh UI state
    if (onClose) onClose();
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const handleParentClick = (label, hasChildren) => {
    if (hasChildren) {
      setOpenParent((prev) => (prev === label ? null : label));
    } else {
      if (label === "Active ID") {
        setActivePanel("activate-id");
      } else {
        console.log("Clicked parent:", label);
      }
    }
  };

  const handleChildClick = (parentLabel, childLabel) => {
    // Profile -> different forms / KYC screens
    if (parentLabel === "Profile") {
      if (childLabel === "Edit Profile") {
        setActivePanel("edit-profile");
        return;
      }
      if (childLabel === "KYC Upload") {
        setActivePanel("kyc-upload");
        return;
      }
      if (childLabel === "Edit Bank Details") {
        setActivePanel("edit-bank-details");
        return;
      }
      // For now we keep Edit Password / Welcome Letter / Create ID Card as simple logs
    }

    // My Team Business Support -> business related panels
    if (parentLabel === "My Team Business Support") {
      if (childLabel === "Team Business") {
        setActivePanel("team-business");
        return;
      }
      if (childLabel === "Rank Reward Business") {
        setActivePanel("rank-reward-business");
        return;
      }
      if (childLabel === "Freedom Business") {
        setActivePanel("freedom-business");
        return;
      }
    }
    console.log(`Clicked: ${parentLabel} → ${childLabel}`);
    setActivePanel(null);
  };

  const renderRightPanelContent = () => {
    // Parent: Active ID
    if (activePanel === "activate-id") {
      return <ActivateID compact />;
    }

    // Parent: Profile
    if (activePanel === "edit-profile") {
      return <EditProfile />;
    }
    if (activePanel === "kyc-upload") {
      return <ImageUpload />;
    }
    if (activePanel === "edit-bank-details") {
      return <EditBankDetail />;
    }

    // Parent: My Team Business Support
    if (activePanel === "team-business") {
      return <TeamBusiness />;
    }
    if (activePanel === "rank-reward-business") {
      return <RankRewardBusiness />;
    }
    if (activePanel === "freedom-business") {
      return <FreedomBusiness />;
    }

    // Default content when nothing specific is selected
    return children || null;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-50 shadow-2xl flex flex-col">
        {/* Top */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-800">
          <span className="text-sm font-semibold tracking-wide uppercase">
            Member Menu
          </span>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-800 text-xl"
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 text-sm">
          {DASHBOARD_ITEMS.map((item) => {
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

        {/* footer */}
        <div className="border-t border-slate-800 px-4 py-4">
          <div className="flex gap-2">
            {isLoggedIn ? (
              // When user is logged in, show only Logout button
              <button
                className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                {/* Register (primary) */}
                <button
                  className="flex-1 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:opacity-95 transition"
                  onClick={
                    onRegisterClick ||
                    (() => {
                      console.log("Register clicked");
                    })
                  }
                >
                  Register
                </button>

                {/* Login (secondary) */}
                <button
                  className="flex-1 rounded-lg border border-slate-500/70 bg-slate-900/60 px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 transition"
                  onClick={
                    onLoginClick ||
                    (() => {
                      console.log("Login clicked");
                    })
                  }
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Right-side slider content area */}
      <section className="fixed inset-y-0 left-72 right-0 z-40 bg-slate-950/95 text-slate-50 border-l border-slate-800 overflow-y-auto p-4 md:p-6">
        {renderRightPanelContent()}
      </section>
    </>
  );
}
