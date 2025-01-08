"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ImageGallery from "@/components/image-gallery";
import GCPList from "@/components/gcp-list";
import { Button } from "@/components/ui/button";

type GCP = {
  id: string;
  tag: string;
  lat: number;
  lng: number;
  alt: number;
  images: string[];
};

const MapWithNoSSR = dynamic(() => import("@/components/map"), { ssr: false });

export default function GCPEditorPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [gcps, setGcps] = useState<GCP[]>([]); // Updated type

  const handleSaveChanges = () => {
    // Implement save logic here
    console.log("Saving GCPs:", gcps);
  };

  const handleDownloadGCPFile = () => {
    // Implement download logic here
    console.log("Downloading GCP file");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">GCP Editor - Project</h1>
      <div className="flex flex-col gap-8">
        <div>
          {/* Uncomment if ImageGallery is used */}
          {/* <ImageGallery onSelectImage={setSelectedImage} /> */}
          <div className="mt-4">
            <MapWithNoSSR gcps={gcps} setGcps={setGcps} />
          </div>
        </div>
        <div>
          <GCPList gcps={gcps} setGcps={setGcps} />
          <div className="mt-4 space-x-2">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
            <Button variant="outline" onClick={handleDownloadGCPFile}>
              Download GCP File
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
