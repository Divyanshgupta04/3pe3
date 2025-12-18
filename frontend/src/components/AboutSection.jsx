// src/components/AboutSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeUp, sectionTitle } from "../config/motionConfig";

const stats = [
  { labelTop: "50k+", labelBottom: "Trusted Customers", accent: "Global" },
  {
    labelTop: "32k+",
    labelBottom: "Projects Completed",
    accent: "Across India",
  },
  { labelTop: "21+", labelBottom: "Years Experience", accent: "Industry-wide" },
  {
    labelTop: "97+",
    labelBottom: "Team Members",
    accent: "Dedicated & Skilled",
  },
];

const AboutSection = () => (
  <section
    id="about"
    className="py-16 md:py-20 border-b border-slate-200 bg-slate-50"
  >
    <div className="max-w-6xl mx-auto px-4">
      {sectionTitle("About Us", "The Most Profitable Company in LSA")}
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-start">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
          className="space-y-5 text-sm md:text-[15px] text-slate-700"
        >
          <p>
            <strong>Life Spark Associates</strong> envisions becoming a trusted
            and well-recognized brand in every Indian household. We offer a wide
            range of products across personal care, health, and wellness,
            designed to improve everyday life and promote long-term well-being.
          </p>

          <p>
            Our <strong>mission</strong> is to educate people about the digital
            world and connect them with strong, sustainable business
            opportunities. Through this, we empower individuals to pursue their
            dreams with confidence and build a financially secure future for
            themselves and their families.
          </p>

          <p>
            Guided by the principle of <strong>“Wealth Through Health,”</strong>{" "}
            we focus on enriching the lives of our community members by
            promoting good health, creating better income opportunities, and
            providing the right guidance for personal and professional growth.
          </p>
          <div className="flex flex-wrap gap-3 pt-3 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-white border border-emerald-100 text-emerald-700">
              Strategy & Consulting
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-cyan-100 text-cyan-700">
              Business Process
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-700">
              Marketing Rules
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-fuchsia-100 text-fuchsia-700">
              Partnerships
            </span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0.2}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white border border-slate-200 p-4 flex flex-col justify-between shadow-sm"
            >
              <p className="text-2xl font-semibold text-emerald-600 mb-2">
                {s.labelTop}
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
                {s.labelBottom}
              </p>
              <p className="text-[11px] text-slate-500">{s.accent}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
