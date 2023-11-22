import React, { useState } from "react";

const ResizeOptions = ({ onResizeChange }) => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);

  const handleWidthChange = (e) => {
    setWidth(e.target.value);
    onResizeChange({ width: e.target.value, height });
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    onResizeChange({ width, height: e.target.value });
  };

  return (
    <div className="resize-options flex justify-center items-center gap-4 my-4">
      <label className="flex flex-col items-center">
        Width:{" "}
        <input
          type="number"
          value={width}
          onChange={handleWidthChange}
          className="border-2 border-gray-300 p-2 mt-1"
        />
      </label>
      <label className="flex flex-col items-center">
        Height:{" "}
        <input
          type="number"
          value={height}
          onChange={handleHeightChange}
          className="border-2 border-gray-300 p-2 mt-1"
        />
      </label>
    </div>
  );
};

export default ResizeOptions;
