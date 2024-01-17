import React from "react";

const TheFooter = (props: { layoutName: string }) => {
  const { layoutName = "container" } = props;
  let classLayout = "container-xxl";

  switch (layoutName) {
    case "fluid":
      classLayout = "container-fluid";
      break;

    case "container":
    default:
      classLayout = "container-xxl";
      break;
  }
  return (
    <>
      {/* Footer */}
      <footer className="content-footer footer bg-footer-theme">
        <div className={`${classLayout} d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column`}>
          <div className="mb-2 mb-md-0">
            ©{new Date().getFullYear()}, made with ❤️ by
            <a href="https://quocbaoit.com" target="_blank" rel="noreferrer" className="footer-link fw-medium">
              QuocBaoIT
            </a>
          </div>
          <div className="d-none d-lg-inline-block">
            <a href="#facebook" target="_blank" rel="noreferrer" className="footer-link me-4">
              Facebook
            </a>
            <a href="#youtube" target="_blank" rel="noreferrer" className="footer-link me-4">
              Youtube
            </a>
            <a href="#support" target="_blank" rel="noreferrer" className="footer-link">
              Support
            </a>
          </div>
        </div>
      </footer>
      {/* / Footer */}
    </>
  );
};

export default TheFooter;
