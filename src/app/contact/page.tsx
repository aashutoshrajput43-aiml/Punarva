"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Submission failed.");
      }
    } catch (e) {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Contact Punarva Headquarters
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Have partnership inquiries, corporate buffet contracts, or volunteer drive requests? Reach out to our civic desk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-900/40 space-y-2 shadow-sm">
              <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
              <div className="font-bold text-slate-900 dark:text-white text-sm">24/7 Helpline & WhatsApp</div>
              <div>
                <a
                  href="tel:+919770869581"
                  className="text-sm text-emerald-400 font-mono font-bold hover:underline inline-flex items-center gap-1.5"
                  title="Direct Call to 9770869581"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +91 97708 69581
                </a>
              </div>
              <div>
                <a
                  href="https://wa.me/919770869581?text=Hello%20Punarva%2C%20I%20need%20assistance%20with%20food%20rescue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-500 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 font-semibold"
                >
                  <span>💬 Direct WhatsApp Chat</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-900/40 space-y-1">
              <Mail className="w-5 h-5 text-amber-400 mb-2" />
              <div className="font-bold text-white text-sm">Support Email</div>
              <div className="text-xs text-slate-400 font-mono">hello@rescuebite.in</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-900/40 space-y-1">
              <MapPin className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="font-bold text-white text-sm">Regional Coordination Hub</div>
              <div className="text-xs text-slate-400">Indore Municipal Innovation Zone, Madhya Pradesh, India</div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-emerald-900/40 shadow-xl">
            {success ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Message Dispatched Successfully!</h3>
                <p className="text-xs text-slate-400">
                  Our regional coordinator will respond within 4 business hours. You can also track alerts in real time.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Chef Sanjeev"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Your Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sanjeev@hotel.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Surplus onboarding for hotel banquet"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please provide details of your inquiry or food surplus availability..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

