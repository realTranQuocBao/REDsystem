import React from "react";
import { Outlet } from "react-router-dom";

const TheContent = () => {
  return <Outlet />;
};

export default TheContent;
// export default React.memo(TheContent);
