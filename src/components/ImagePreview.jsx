import React, { useState, useEffect } from "react";
import Pica from "pica";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { FiDownload } from "react-icons/fi"; // Importing download icon from react-icons

const ImagePreview = ({ images, resizeOptions }) => {
  const [resizedImages, setResizedImages] = useState([]);

  useEffect(() => {
    if (images.length > 0) {
      resizeImages(images, resizeOptions);
    }
  }, [images, resizeOptions]);

  const resizeImages = async (images, options) => {
    const pica = Pica();
    const resizedImagesPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = options.width;
        offscreenCanvas.height = options.height;

        const img = new Image();
        img.onload = () => {
          pica
            .resize(img, offscreenCanvas)
            .then((result) => pica.toBlob(result, "image/jpeg"))
            .then((blob) => {
              const resizedImageUrl = URL.createObjectURL(blob);
              resolve({ original: image, resized: resizedImageUrl, blob });
            })
            .catch((err) => reject(err));
        };
        img.src = image.preview;
      });
    });

    const resizedImages = await Promise.all(resizedImagesPromises);
    setResizedImages(resizedImages);
  };

  const getFileSize = (fileBlob) => {
    // Converting bytes to KB for display
    return (fileBlob.size / 1024).toFixed(2) + " KB";
  };

  const downloadImage = (imageBlob, filename) => {
    saveAs(imageBlob, filename);
  };

  const downloadAllImages = () => {
    const zip = new JSZip();
    resizedImages.forEach((image, index) => {
      zip.file(`resized_image_${index}.jpg`, image.blob);
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "resized_images.zip");
    });
  };

  return (
    <div className="image-preview-container">
      <div className="image-preview grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 overflow-auto">
        {resizedImages.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image.resized}
              alt={`Resized ${index}`}
              className="max-w-xs w-full h-auto"
            />
            <button
              onClick={() =>
                downloadImage(image.blob, `resized_image_${index}.jpg`)
              }
              className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white font-bold p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiDownload size={20} />
            </button>
            <p className="text-sm text-center mt-2">
              Original: {getFileSize(image.original)} | Final:{" "}
              {getFileSize(image.blob)}
            </p>
          </div>
        ))}
      </div>
      <div className="download-all-container text-center mt-4">
        {resizedImages.length > 0 && (
          <button
            onClick={downloadAllImages}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Download All as ZIP
          </button>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
