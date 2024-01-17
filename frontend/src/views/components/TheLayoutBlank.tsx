import React from "react";
import { Outlet } from "react-router-dom";

const TheLayoutBlank = () => {
  document.querySelector("html")?.classList.add("light-style");
  document.querySelector("html")?.classList.add("layout-wide");
  return (
    <>
      {/* Content */}
      <Outlet />
      {/* / Content */}
    </>
  );
};

export default TheLayoutBlank;
