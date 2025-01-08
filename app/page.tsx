"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProjectsList from "@/components/projects-list";
import Papa from "papaparse";
import txtToJson from "txt-file-to-json";

interface GCPData {
  label: string; // GCP Label
  x: number; // X Coordinate
  y: number; // Y Coordinate
  z: number; // Z Coordinate
}

export default function Home() {
  const [parsedData, setParsedData] = useState<any>([]);

  const handleCSVUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvContent = event.target?.result as string;
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (
            result.meta.fields &&
            result.meta.fields.includes("GCP Label") &&
            result.meta.fields.includes("Y") &&
            result.meta.fields.includes("X") &&
            result.meta.fields.includes("Z")
          ) {
            setParsedData(result.data);
            console.log("Parsed CSV Data:", result.data);
          } else {
            console.error("Invalid CSV format.");
          }
        },
      });
    };
    reader.readAsText(file);
  };

  const handleTXTUpload = async (file: File) => {
    try {
      const txtContent = await file.text();
      const jsonData = txtToJson(txtContent, {
        rowDelimiter: "\n",
        columnDelimiter: " ",
        skipEmptyRows: true,
      });
      setParsedData(jsonData);
      console.log("Parsed TXT Data:", jsonData);
    } catch (error) {
      console.error("Error parsing TXT file:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Drone GCP Manager</h1>
      <div className="space-y-4 mb-8">
        <Button asChild>
          <label htmlFor="csv-upload" className="cursor-pointer">
            Upload CSV File
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleCSVUpload(file);
              }}
            />
          </label>
        </Button>
        <Button asChild>
          <label htmlFor="txt-upload" className="cursor-pointer">
            Upload TXT File
            <input
              id="txt-upload"
              type="file"
              accept=".txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleTXTUpload(file);
              }}
            />
          </label>
        </Button>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Parsed Data</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(parsedData, null, 2)}
        </pre>
      </div>
      <ProjectsList />
    </div>
  );
}
