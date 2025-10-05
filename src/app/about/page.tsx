import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Award, Calendar, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        <div className="bg-gradient-to-br from-amber-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Link
                href="/"
                className="inline-flex items-center text-amber-800 hover:text-amber-700 mb-8"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                About Ersho Events
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Creating unforgettable experiences, one event at a time
              </p>
            </div>
          </div>
        </div>

        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Hi! I'm the founder of Ersho Events. With years of
                    experience in event planning and management, I specialize in
                    creating unforgettable experiences that exceed your
                    expectations.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    From intimate weddings to grand corporate events, we handle
                    every detail with precision and care. Our team manages
                    everything from vendor coordination to marketing, ensuring
                    your event is nothing short of spectacular.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-amber-800 rounded-full mx-auto mb-3">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Passionate
                    </h3>
                    <p className="text-sm text-gray-600">We love what we do</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-amber-800 rounded-full mx-auto mb-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Experienced
                    </h3>
                    <p className="text-sm text-gray-600">Years of expertise</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-amber-800 rounded-full mx-auto mb-3">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Award-Winning
                    </h3>
                    <p className="text-sm text-gray-600">
                      Recognized excellence
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-amber-800 rounded-full mx-auto mb-3">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Reliable
                    </h3>
                    <p className="text-sm text-gray-600">Always on time</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-amber-200 to-amber-300 rounded-2xl p-8 shadow-2xl">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Heart className="h-16 w-16 mx-auto mb-4 text-amber-600" />
                        <p className="text-lg font-medium">Our Team</p>
                        <p className="text-sm">Dedicated to your success</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <Award className="h-6 w-6 text-amber-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-amber-800 text-white rounded-full p-3 shadow-lg">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                To transform your vision into reality by creating exceptional
                events that leave lasting memories. We believe every celebration
                deserves to be extraordinary, and we're here to make that
                happen.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
