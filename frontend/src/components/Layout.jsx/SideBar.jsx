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
            className="fixed inset-0 bg-black z-40"
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
            className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-600 to-indigo-500 text-white shadow-xl z-50 md:hidden"
          >
            <SidebarContent onClose={() => setOpen(false)} isActive={isActive} />
          </motion.aside>
        )}
      </AnimatePresence>

    
      <aside className="hidden md:block w-64 h-screen bg-gradient-to-b from-indigo-600 to-indigo-500 text-white shadow-xl fixed top-0 left-0">
        <SidebarContent isActive={isActive} />
      </aside>
    </>
  );
};


const SidebarContent = ({ onClose, isActive }) => (
  <div className="flex flex-col h-full">
    <div className="p-6 flex items-center justify-between border-b border-indigo-400">
      <span className="text-2xl font-bold">My SaaS</span>
      {onClose && (
        <button
          className="text-white text-2xl md:hidden"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </div>

    <nav className="flex-1 overflow-y-auto mt-4">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              onClick={onClose}
              className={`flex items-center gap-4 px-5 py-3 rounded-lg transition-all
                ${
                  isActive(link.path)
                    ? "bg-white/20 border-l-4 border-yellow-400"
                    : "hover:bg-white/10"
                }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-base font-medium">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    <div className="p-4 text-xs text-indigo-200 border-t border-indigo-400">
      &copy; 2025 My SaaS
    </div>
  </div>
);

export default SideBar;
