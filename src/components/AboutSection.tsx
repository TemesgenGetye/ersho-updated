import Link from "next/link";
import { Heart, Users, Award, Calendar } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Ersho Events
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Hi! I am the founder of Ersho Events. With years of experience
                in event planning and management, I specialize in creating
                unforgettable experiences that exceed your expectations.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From intimate weddings to grand corporate events, we handle
                every detail with precision and care. Our team manages
                everything from vendor coordination to marketing, ensuring your
                event is nothing short of spectacular.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-slate-700 rounded-full mx-auto mb-3">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Passionate
                </h3>
                <p className="text-sm text-gray-600">We love what we do</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-slate-700 rounded-full mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Experienced
                </h3>
                <p className="text-sm text-gray-600">Years of expertise</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-slate-700 rounded-full mx-auto mb-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Award-Winning
                </h3>
                <p className="text-sm text-gray-600">Recognized excellence</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-slate-700 rounded-full mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Reliable
                </h3>
                <p className="text-sm text-gray-600">Always on time</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
              >
                Learn More About Us
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg">
              <div className="bg-white rounded-xl p-6 shadow">
                <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Heart className="h-16 w-16 mx-auto mb-4 text-slate-600" />
                    <p className="text-lg font-medium">Our Team</p>
                    <p className="text-sm">Dedicated to your success</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow">
              <Award className="h-6 w-6 text-slate-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-slate-800 text-white rounded-full p-3 shadow">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
