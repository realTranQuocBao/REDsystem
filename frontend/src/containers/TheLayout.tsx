import React, { useEffect, useState } from "react";
import { TheTopBar, TheLeftBar, TheContent, TheFooter } from "./index";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "services/auth.service";
import TheBreadcrumb from "./TheBreadcrumb";

const TheLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // runs checkUser() on location change (i.e. route)
    // checkUser();

    //start loading
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.accessToken) {
      authService
        .info()
        .then((res) => {
          setAuthenticated(true);
        })
        .catch((err) => {
          localStorage.removeItem("user");
          setAuthenticated(false);
          if (err?.message === "[REDsystem Error]: Not authorized, token failed") {
            navigate("/signin");
          }
        });
    }
  }, [location, navigate]);

  console.log("authenticated", authenticated);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `/assets/js/app.js`;

    script.async = true;
    script.onload = () => {
      console.log("Script MainJS loaded and executed successfully");
    };
    script.onerror = () => {
      console.error("Script MainJS failed to load");
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Loader */}
      <div id="preloader">
        <div id="status">
          <div className="spinner"></div>
        </div>
      </div>

      <div id="wrapper">
        {/* ========== Left Sidebar Start ========== */}
        <TheLeftBar />
        {/* ========== Left Sidebar  End  ========== */}

        {/*  ========== Start right Content here ========== */}

        <div className="content-page">
          {/* Start content */}
          <div className="content">
            {/* Top Bar Start */}
            <TheTopBar />
            {/* Top Bar End */}

            <div className="page-content-wrapper">
              {/* container-start: page-title&breadcrumb&content */}
              <div className="container-fluid">
                {/*=====page-title & start breadcrumb HERE=====*/}
                <TheBreadcrumb />
                {/*=====CONTENT HERE=====*/}
                <TheContent />
              </div>
              {/* container-end: page-title&breadcrumb&content */}
            </div>
            {/* Page content Wrapper */}
          </div>
          {/* End content */}

          <TheFooter />
        </div>
        {/*  ==========  End right Content here ========== */}
      </div>
    </>
  );
};

export default TheLayout;
