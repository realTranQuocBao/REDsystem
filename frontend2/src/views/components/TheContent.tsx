import React from "react";
import { Outlet } from "react-router-dom";

const TheContent = (props: { layoutName: string }) => {
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
    <div className={`${classLayout} flex-grow-1 container-p-y`}>
      <Outlet />
    </div>
  );
};

export default TheContent;
// export default React.memo(TheContent);
