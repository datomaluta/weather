import React from "react";
import iconLoading from "../../assets/images/icon-loading.svg";
const Loader = () => {
  return (
    <div className="mt-10 text-center">
      <img
        src={iconLoading}
        alt="loading"
        className="animate-spin h-6 mx-auto mb-2"
      />
      <p className="text-md">Getting your location...</p>
    </div>
  );
};

export default Loader;
