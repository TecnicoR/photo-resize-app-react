import React from "react";
import ImageUpload from "./ImageUpload";
import ResizeOptions from "./ResizeOptions";
import ImagePreview from "./ImagePreview";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <ImageUpload />
      <ResizeOptions />
      <ImagePreview />
    </div>
  );
}
