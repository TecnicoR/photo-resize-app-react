import React from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onImageUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      onImageUpload(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <div
      {...getRootProps()}
      className="dropzone p-6 m-6 border-dashed border-4 border-gray-300 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        Drag 'n' drop some images here, or click to select images
      </p>
    </div>
  );
};

export default ImageUpload;
