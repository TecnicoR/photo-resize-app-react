import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import ResizeOptions from "./components/ResizeOptions";
import ImagePreview from "./components/ImagePreview";
import "./App.css"; // Make sure to create an App.css for additional styles
import Header from "./components/Header";

function App() {
  const [images, setImages] = useState([]);
  const [resizeOptions, setResizeOptions] = useState({
    width: 300,
    height: 300,
  });

  const handleImageUpload = (newImages) => {
    setImages(newImages);
  };

  const handleResizeChange = (newOptions) => {
    setResizeOptions(newOptions);
  };

  return (
    <div className="App container mx-auto p-4">
      <Header />
      <ImageUpload onImageUpload={handleImageUpload} />
      <ResizeOptions onResizeChange={handleResizeChange} />
      <ImagePreview images={images} resizeOptions={resizeOptions} />
    </div>
  );
}

export default App;
