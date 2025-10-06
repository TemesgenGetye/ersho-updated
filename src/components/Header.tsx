"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User, LogOut, Settings } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, profile, signOut, isAdmin } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm mt-1.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo (simplified) */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-16 h-12 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 shadow-sm bg-white flex items-center justify-center">
              <Image
                src="/logo.jpg"
                alt="Ersho Events Logo"
                width={64}
                height={48}
                className="object-contain p-1"
              />
            </div>
            <span className="hidden sm:inline-block text-lg font-bold text-slate-900">Ersho Events</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              Events
            </Link>
            <Link
              href="/gallery"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-slate-800 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-slate-800 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{profile?.full_name || "User"}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white overflow-auto">
            <div className="flex items-center justify-between px-4 pt-6">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                  <div className="w-12 h-8 relative rounded-md overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                    <Image src="/logo.jpg" alt="logo" width={48} height={32} className="object-contain p-1" />
                  </div>
                  <span className="text-lg font-bold text-slate-900">Ersho</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-6 px-4 pb-8 space-y-4">
              {[
                ["/", "Home"],
                ["/events", "Events"],
                ["/gallery", "Gallery"],
                ["/about", "About"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <Link
                  key={String(href)}
                  href={String(href)}
                  className="block px-4 py-4 text-xl font-medium text-slate-800 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {String(label)}
                </Link>
              ))}

              <div className="border-t border-gray-200 mt-4 pt-4 space-y-4">
                {user ? (
                  <>
                    <div className="text-sm text-slate-600 px-4">
                      {profile?.full_name || "User"}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-3 text-slate-800 hover:bg-gray-100 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-4 py-3 text-slate-800 hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-slate-800 hover:bg-gray-100 rounded-lg"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="block px-4 py-3 text-slate-800 hover:bg-gray-100 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block px-4 py-3 bg-slate-800 text-white rounded-lg text-center hover:bg-slate-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Optional tagline bar under the header
export function HeaderTagline() {
  return (
    <div className="bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <p className="text-sm text-slate-600 text-center">Professional event planning &amp; management — tailored to your vision.</p>
      </div>
    </div>
  );
}
