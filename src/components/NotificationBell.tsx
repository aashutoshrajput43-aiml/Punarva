"use client";

import React, { useEffect, useState } from "react";
import { Bell, CheckCircle2, AlertTriangle, ExternalLink, X } from "lucide-react";
import Link from "next/link";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  link?: string | null;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(
          (data.notifications || []).filter((n: NotificationItem) => !n.isRead).length
        );
      }
    } catch (e) {
      // quiet fail on poller
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 8 seconds as specified
    const interval = setInterval(fetchNotifications, 8000);
    return () => clearInterval(interval);
  }, []);

  const markAllRead = async () => {
    try {
      await fetch("/api/notifications/read-all", { method: "POST" });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (e) {}
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        className="relative p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-emerald-900/40 border border-transparent hover:border-slate-200 dark:hover:border-emerald-800/40 transition-all"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-slate-950 shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 dark:border-emerald-800/40 bg-white/95 dark:bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl z-50 text-slate-900 dark:text-slate-200 transition-colors">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-emerald-900/50">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                Live Rescue Alerts
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/40 font-bold">
                {unreadCount} new
              </span>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="mt-3 max-h-80 overflow-y-auto space-y-2.5 divide-y divide-slate-100 dark:divide-emerald-900/20 pr-1">
            {notifications.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6">
                No active notifications. System operating normally.
              </p>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`pt-2.5 first:pt-0 p-3 rounded-xl transition-all ${
                    !item.isRead
                      ? "bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40 shadow-xs"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {item.type === "EMERGENCY_ALERT" ? (
                      <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed font-normal">
                        {item.message}
                      </p>
                      {item.link && (
                        <Link
                          href={item.link}
                          onClick={() => setIsOpen(false)}
                          className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-amber-400 hover:underline"
                        >
                          View Mission details <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
