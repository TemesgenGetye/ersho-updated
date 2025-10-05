"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Image as ImageIcon,
  Users,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";
import NextImage from "next/image";
import { supabase } from "@/lib/supabase";

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string | null;
  created_at: string;
}

interface EventImage {
  id: string;
  image_url: string;
  event_id: string | null;
  submitted_by: string;
  is_approved: boolean;
  created_at: string;
  event: {
    title: string;
  } | null;
  profile: {
    full_name: string;
  };
}

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState<Event[]>([]);
  const [images, setImages] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/");
      return;
    }

    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin, authLoading, router]);

  const fetchData = async () => {
    try {
      const [eventsResult, imagesResult] = await Promise.all([
        supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("event_images")
          .select(
            `
            *,
            event:events(title),
            profile:profiles(full_name)
          `
          )
          .order("created_at", { ascending: false }),
      ]);

      if (eventsResult.error) throw eventsResult.error;
      if (imagesResult.error) throw imagesResult.error;

      setEvents(eventsResult.data || []);
      setImages(imagesResult.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveImage = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from("event_images")
        .update({ is_approved: true, approved_at: new Date().toISOString() })
        .eq("id", imageId);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error("Error approving image:", error);
    }
  };

  const handleRejectImage = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from("event_images")
        .delete()
        .eq("id", imageId);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error("Error rejecting image:", error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const pendingImages = images.filter((img) => !img.is_approved);
  const approvedImages = images.filter((img) => img.is_approved);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage events and approve user-submitted images
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-slate-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Events
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {events.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ImageIcon className="h-8 w-8 text-slate-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pending Images
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {pendingImages.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Approved Images
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {approvedImages.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-slate-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Images
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {images.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("events")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "events"
                    ? "border-slate-500 text-slate-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab("images")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "images"
                    ? "border-slate-500 text-slate-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Image Approvals
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "events" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Events Management
                  </h2>
                  <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Event
                  </button>
                </div>

                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {event.description}
                          </p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(event.event_date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-slate-600 hover:text-slate-700">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "images" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Image Approvals
                </h2>

                <div className="space-y-4">
                  {pendingImages.map((image) => (
                    <div
                      key={image.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                          {image.image_url ? (
                            <NextImage
                              src={image.image_url}
                              alt={`Submitted image by ${
                                image.profile?.full_name || "user"
                              }`}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            Submitted by:{" "}
                            {image.profile?.full_name || "Unknown User"}
                          </p>
                          {image.event?.title && (
                            <p className="text-sm text-gray-600">
                              Event: {image.event.title}
                            </p>
                          )}
                          <p className="text-sm text-gray-500">
                            {new Date(image.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => handleApproveImage(image.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectImage(image.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {pendingImages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No pending images to review
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
