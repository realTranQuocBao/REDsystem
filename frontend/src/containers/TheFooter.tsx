import React from "react";
import { getTimeDMY } from "utils";

const TheFooter = () => {
  return (
    <>
      <footer className="footer">© {getTimeDMY()} by REDsystem.</footer>
    </>
  );
};

export default TheFooter;
