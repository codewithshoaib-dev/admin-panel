import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBell,
  FaRegCreditCard,
  FaClipboardList,
  FaCog,
  FaBars,
  FaUser


} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { name: "Notifications", icon: <FaBell />, path: "notifications" },
  { name: "Users", icon: <FaUser />, path: "users" },
  { name: "Subscriptions", icon: <FaRegCreditCard />, path: "subscriptions" },
  { name: "Audit Logs", icon: <FaClipboardList />, path: "auditlogs" },
  { name: "Settings", icon: <FaCog />, path: "settings" },
];

const SideBar = ({ open, setOpen }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

    return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 left-0 h-full w-64 bg-white text-neutral-900 shadow-2xl z-50 md:hidden"
          >
            <SidebarContent onClose={() => setOpen(false)} isActive={isActive} />
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden md:block w-64 h-screen bg-white text-neutral-900 shadow-2xl fixed top-0 left-0">
        <SidebarContent isActive={isActive} />
      </aside>
    </>
  );
};

const SidebarContent = ({ onClose, isActive }) => (
  <div className="flex flex-col h-full">
    <div className="p-5 flex items-center justify-between border-b border-neutral-200">
      <span className="text-xl font-bold tracking-tight">My SaaS</span>
      {onClose && (
        <button onClick={onClose} className="text-2xl text-neutral-400 md:hidden">
          &times;
        </button>
      )}
    </div>

    <nav className="flex-1 overflow-y-auto mt-4">
      <ul className="space-y-1 px-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
                ${
                  isActive(link.path)
                    ? "bg-neutral-100 text-neutral-900 font-medium"
                    : "hover:bg-neutral-100 text-neutral-600"
                }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    <div className="p-4 text-xs text-neutral-400 border-t border-neutral-200">
      &copy; 2025 My SaaS
    </div>
  </div>
)

export default SideBar