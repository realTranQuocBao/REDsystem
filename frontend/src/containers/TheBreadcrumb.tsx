import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import privateRoute from "routes/private.route";
import { publicURL } from "setting";

const TheBreadcrumb = () => {
  const location = useLocation();
  const { pathname } = location;
  const segments = pathname.split("/");
  let url = "";

  const getRouteBreadcrumb = (path: string) => {
    const currentRoute = privateRoute.find((route) => (matchPath(route.path, path) ? true : route.path === path));
    const result = currentRoute ? currentRoute.breadcrumb : "Home";
    if (result !== "Home" || path.length === 0) {
      return result;
    } else {
      return null;
    }
  };
  const getRouteTitle = (path: string) => {
    const currentRoute = privateRoute.find((route) => (matchPath(route.path, path) ? true : route.path === path));
    return currentRoute ? currentRoute.title : "Home";
  };

  return (
    <>
      {/* start page-title & start breadcrumb */}
      <div className="row">
        <div className="col-sm-12">
          <div className="page-title-box">
            <div className="btn-group float-right">
              <ol className="breadcrumb hide-phone p-0 m-0">
                {segments.map((segment, index) => {
                  if (segment) {
                    url += `/${segment}`;
                  }

                  const breadcrumb = getRouteBreadcrumb(url);

                  if (breadcrumb)
                    if (index === segments.length - 1) {
                      return <li className="breadcrumb-item active">{breadcrumb}</li>;
                    } else {
                      return (
                        <li className="breadcrumb-item">
                          <a key={index} href={`${publicURL}${url}`}>
                            {breadcrumb}
                          </a>
                        </li>
                      );
                    }

                  return false;
                })}
              </ol>
            </div>
            <h4 className="page-title">{getRouteTitle(url)}</h4>
          </div>
        </div>
      </div>
      {/* end page-title & end breadcrumb */}
    </>
  );
};

export default TheBreadcrumb;
