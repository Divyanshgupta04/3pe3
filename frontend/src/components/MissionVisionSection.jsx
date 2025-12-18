// src/components/MissionVisionSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../config/motionConfig";

const MissionVisionSection = () => {
  return (
    <section className="py-16 md:py-20 border-b border-slate-200 bg_white bg-white">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
          className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 mb-2">
            Our Mission
          </p>
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            Empowering people through digital education & business.
          </h3>
          <p className="text-sm text-slate-700 mb-3">
            The mission of Life Spark Associates is to empower everyday people
            with digital knowledge, proper training, and a strong business
            model, enabling them to live life on their own terms.
          </p>

          <p className="text-sm text-slate-700 mb-4">
            We follow a hybrid model that combines both e-commerce and direct
            selling, allowing every member to grow according to their own
            potential and goals.
          </p>

          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Practical business training</li>
            <li>• Simple plans for new members</li>
            <li>• Focus on long-term, ethical growth</li>
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.15}
          className="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-indigo-600 mb-2">
            Our Vision
          </p>
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            A trusted name in every Indian household.
          </h3>
          <p className="text-sm text-slate-700 mb-3">
            Our vision is to provide personal care, health, and wellness
            products that evolve with changing needs and lifestyles.
          </p>

          <p className="text-sm text-slate-700 mb-4">
            By leveraging the power of digital transformation, we aim to create
            a prosperous future for both our partners and customers.
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• Digital-first business expansion</li>
            <li>• Strong product quality & innovation</li>
            <li>• Helping people live on their own terms</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
