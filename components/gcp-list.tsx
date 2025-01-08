"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type GCP = {
  id: string;
  tag: string;
  lat: number;
  lng: number;
  alt: number;
  images: string[];
};

export default function GCPList({
  gcps,
  setGcps,
}: {
  gcps: GCP[];
  setGcps: React.Dispatch<React.SetStateAction<GCP[]>>;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string) => {
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setGcps((prev) => prev.filter((gcp) => gcp.id !== id));
  };

  const handleChange = (id: string, field: keyof GCP, value: string) => {
    setGcps((prev) =>
      prev.map((gcp) =>
        gcp.id === id ? { ...gcp, [field]: parseFloat(value) || 0 } : gcp
      )
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Ground Control Points</h3>
      {gcps.map((gcp) => (
        <div key={gcp.id} className="flex items-center space-x-2">
          <span>{gcp.tag}</span>
          {editingId === gcp.id ? (
            <>
              <Input
                type="number"
                value={gcp.lat}
                onChange={(e) => handleChange(gcp.id, "lat", e.target.value)}
                className="w-24"
              />
              <Input
                type="number"
                value={gcp.lng}
                onChange={(e) => handleChange(gcp.id, "lng", e.target.value)}
                className="w-24"
              />
              <Input
                type="number"
                value={gcp.alt}
                onChange={(e) => handleChange(gcp.id, "alt", e.target.value)}
                className="w-24"
              />
              <Button onClick={() => handleSave(gcp.id)}>Save</Button>
            </>
          ) : (
            <>
              <span className="w-24">{gcp.lat.toFixed(6)}</span>
              <span className="w-24">{gcp.lng.toFixed(6)}</span>
              <span className="w-24">{gcp.alt.toFixed(2)}</span>
              <Button variant="outline" onClick={() => handleEdit(gcp.id)}>
                Edit
              </Button>
            </>
          )}
          <Button variant="destructive" onClick={() => handleDelete(gcp.id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
