"use client";

import { User } from "@/lib/types";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface NavbarProps {
  user: User;
}

export default function Navbar({ user }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <nav className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left logo and page title */}
      <div className="flex items-center gap-6">
        <span className="text-lg font-bold text-gray-900">ticktock</span>
        <span className="text-sm text-gray-500">Timesheets</span>
      </div>
      {/* Right section - user and dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer"
        >
          {user.name}
          {/* Chevron down icon */}
          <svg
            className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-md z-10">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
