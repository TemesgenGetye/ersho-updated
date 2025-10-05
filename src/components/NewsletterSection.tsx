"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Here you would typically send the email to your backend
      // For now, we'll just simulate a successful subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-gray-900">
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl text-slate-600 mb-8">
              Subscribe to our newsletter and be the first to know about
              upcoming events, special offers, and exclusive content.
            </p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-slate-400 mr-2" />
                <span className="text-slate-600">Monthly updates</span>
              </div>
              <div className="flex items-center">
                <Send className="h-6 w-6 text-slate-400 mr-2" />
                <span className="text-slate-600">No spam, ever</span>
              </div>
            </div>
          </div>

          {/* Right Content - Newsletter Form */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-2xl">
            {isSubscribed ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  You have been successfully subscribed to our newsletter.
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-slate-800 hover:text-slate-700 font-semibold"
                >
                  Subscribe Another Email
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Sign Up to Our Newsletter
                </h3>
                <p className="text-gray-600 mb-6">
                  Get the latest updates on our events and special offers
                  delivered straight to your inbox.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email here"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full bg-amber-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Subscribing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="h-5 w-5 mr-2" />
                        Subscribe
                      </div>
                    )}
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-4">
                  By subscribing, you agree to our privacy policy and terms of
                  service.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
