import React from "react";
import { TheMenu, TheContent, TheFooter, TheNavBar } from "./index";
// import { Outlet } from "react-router-dom";

const TheLayout = (props: { layoutName?: string; isWithoutNavbar?: boolean; isWithoutMenu?: boolean }) => {
  document.querySelector("html")?.classList.add("light-style");
  document.querySelector("html")?.classList.add("layout-menu-fixed");
  let classLayout = "container-xxl";

  const { layoutName = "container", isWithoutNavbar = false, isWithoutMenu = false } = props || {};

  switch (layoutName) {
    case "fluid":
      document.querySelector("html")?.classList.add("layout-wide");
      classLayout = "container-fluid";
      break;

    case "container":
    default:
      classLayout = "container-xxl";
      document.querySelector("html")?.classList.add("layout-compact");
      break;
  }

  console.log("isWithoutNavbar", isWithoutNavbar);
  console.log("isWithoutMenu", isWithoutMenu);
  console.log("classLayout", classLayout);

  return (
    <>
      {/* Layout wrapper */}
      <div className={`layout-wrapper layout-content-navbar${isWithoutMenu ? " layout-without-menu" : ""}`}>
        <div className="layout-container">
          {!isWithoutMenu && <TheMenu />}

          {/* Layout container */}
          <div className="layout-page">
            {!isWithoutNavbar && <TheNavBar layoutName={layoutName} isWithoutMenu={isWithoutMenu} />}

            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <TheContent layoutName={layoutName} />
              {/* / Content */}
              <TheFooter layoutName={layoutName} />
              <div className="content-backdrop fade"></div>
            </div>
            {/* Content wrapper */}
          </div>
          {/* / Layout page */}
        </div>

        {/* Overlay */}
        {!isWithoutMenu && <div className="layout-overlay layout-menu-toggle"></div>}
      </div>
      {/* / Layout wrapper */}
    </>
  );
};

export default TheLayout;
