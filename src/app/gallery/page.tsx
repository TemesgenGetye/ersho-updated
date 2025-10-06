"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Camera, Upload, ArrowLeft, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface EventImage {
  id: string;
  image_url: string;
  event_id: string;
  submitted_by: string;
  is_approved: boolean;
  created_at: string;
  event: {
    title: string;
  };
}

export default function GalleryPage() {
  const [images, setImages] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchApprovedImages();
  }, []);

  const fetchApprovedImages = async () => {
    try {
      const { data, error } = await supabase
        .from("event_images")
        .select(
          `
          *,
          event:events(title)
        `
        )
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);
    try {
      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("event-images").getPublicUrl(fileName);

      // Insert record into event_images table
      const { error: insertError } = await supabase
        .from("event_images")
        .insert({
          image_url: publicUrl,
          submitted_by: user.id,
          event_id: null, // For now, we'll allow general gallery submissions
        });

      if (insertError) throw insertError;

      // Reset form and close modal
      setSelectedFile(null);
      setShowUploadModal(false);
      fetchApprovedImages(); // Refresh the gallery
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-16">
        <div className="bg-gradient-to-br linear-gradient(135deg, rgba(165,139,120,0.04), #ffffff">
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
                Event Gallery
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Share your memories from our events. Upload your photos and
                they'll be reviewed by our team.
              </p>

              {user && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Your Photos
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            ) : images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={image.image_url}
                      alt={`Event photo from ${
                        image.event?.title || "our event"
                      }`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    {image.event?.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <p className="text-white text-sm font-medium">
                          {image.event.title}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Photos Yet
                </h3>
                <p className="text-gray-600">
                  Be the first to share your event memories!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Photo
            </h3>
            <p className="text-gray-600 mb-6">
              Select a photo from your event to share with our community. It
              will be reviewed before going live.
            </p>

            <div className="mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              />
            </div>

            {selectedFile && (
              <div className="mb-6">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="flex-1 px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? "Uploading..." : "Upload Photo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
