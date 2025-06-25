import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
