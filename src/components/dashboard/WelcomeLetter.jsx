import React from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCreditCard, FiArrowRight } from "react-icons/fi";

const MotionDiv = motion.div;

export default function WelcomeLetter({
  userName = "Member",
  email = "user@example.com",
  inviteCode = "LS-INV-0000",
  onBack,
  onCreateIdCard,
  onContinue,
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-80 w-80 bg-indigo-500/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 bg-violet-500/40 blur-3xl rounded-full" />
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="max-w-3xl w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400">Life Spark</p>
            <h1 className="text-2xl font-semibold text-white">Welcome Letter</h1>
            <p className="text-sm text-slate-300 mt-1">
              Dear <span className="text-indigo-400 font-medium">{userName}</span>,
            </p>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="shrink-0 rounded-xl px-3 py-2 text-sm bg-slate-950 border border-slate-800 text-slate-200 hover:bg-slate-900 transition inline-flex items-center gap-2"
            >
              <FiArrowLeft />
              Back
            </button>
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-slate-950/60 border border-slate-800 p-5 text-slate-200 leading-relaxed">
          <p className="text-sm">
            Welcome to <span className="font-semibold">Life Spark</span>.
            Your account has been created successfully.
          </p>

          <p className="text-sm mt-4">
            Please keep your login details safe. You registered with:
          </p>
          <ul className="text-sm mt-2 space-y-1 text-slate-300">
            <li>
              <span className="text-slate-400">Email:</span> {email}
            </li>
            <li>
              <span className="text-slate-400">Invite Code:</span> {inviteCode}
            </li>
          </ul>

          <p className="text-sm mt-4">
            You can use your invite code to build your network. Next, you can create
            a simple ID card for your profile.
          </p>

          <p className="text-xs text-slate-400 mt-4">
            Note: Don’t share your password with anyone. Life Spark team will never
            ask for it.
          </p>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <button
            onClick={onCreateIdCard}
            className="w-full rounded-xl py-2.5 text-sm font-medium bg-slate-950 border border-slate-800 text-slate-100 flex items-center justify-center gap-2 hover:bg-slate-900 transition"
          >
            <FiCreditCard />
            Create ID Card
          </button>

          <button
            onClick={onContinue}
            className="w-full rounded-xl py-2.5 text-sm font-medium bg-gradient-to-r from-indigo-500 to-violet-500 text-white flex items-center justify-center gap-2 hover:brightness-110 transition"
          >
            Go to Dashboard
            <FiArrowRight />
          </button>
        </div>
      </MotionDiv>
    </div>
  );
}
