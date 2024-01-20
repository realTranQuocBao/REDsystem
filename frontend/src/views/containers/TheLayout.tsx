import React, { useEffect } from "react";
import { TheTopBar, TheLeftBar, TheContent, TheFooter } from "./index";
import { publicURL } from "setting";

const TheLayout = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${publicURL}/assets/js/app.js`;

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
                {/* start page-title & start breadcrumb */}
                <div className="row">
                  <div className="col-sm-12">
                    <div className="page-title-box">
                      <div className="btn-group float-right">
                        <ol className="breadcrumb hide-phone p-0 m-0">
                          <li className="breadcrumb-item">
                            <a href="/#quocbao">Zoogler</a>
                          </li>
                          <li className="breadcrumb-item">
                            <a href="/#quocbao">Pages</a>
                          </li>
                          <li className="breadcrumb-item active">Starter</li>
                        </ol>
                      </div>
                      <h4 className="page-title">Starter</h4>
                    </div>
                  </div>
                </div>
                {/* end page-title & end breadcrumb */}

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
