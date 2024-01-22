import React from "react";
import { useNavigate } from "react-router-dom";

const TheLeftBar = () => {
  const navigate = useNavigate();
  const swal = (window as any).swal;
  const alertify = (window as any).alertify;

  const handleSignOut = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    swal({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out now!",
      cancelButtonText: "No, cancel!",
      confirmButtonClass: "btn btn-danger mr-3",
      cancelButtonClass: "btn btn-success ml-3",
      buttonsStyling: false
    }).then(function (event: { dismiss?: string; value?: boolean }) {
      if (event.dismiss) {
        alertify.success("Sign out canceled!");
      }
      if (event.value === true) {
        alertify.success("Signing out of your account...");
        localStorage.removeItem("user");
        return navigate("/signin");
      }
    });
  };

  const handleNothing = () => {
    alertify.success("Feature not available yet!");
  };

  return (
    <>
      <div className="left side-menu">
        <button type="button" className="button-menu-mobile button-menu-mobile-topbar open-left waves-effect">
          <i className="ion-close"></i>
        </button>

        {/* LOGO */}
        <div className="topbar-left">
          <div className="text-center bg-logo">
            <a href="/" className="logo">
              <img src="/assets/images/logo-only.png" height="24" alt="logo" /> RED System
            </a>
          </div>
        </div>
        <div className="sidebar-user">
          <img src="/assets/images/users/avatar-6.jpg" alt="user" className="rounded-circle img-thumbnail mb-1" />
          <h6 className="">{JSON.parse(localStorage.getItem("user") || "{}")?.name || "Unknow :("}</h6>
          <p className="online-icon text-dark">
            <i className="mdi mdi-record text-success"></i>online
          </p>
          <ul className="list-unstyled list-inline mb-0 mt-2">
            <li className="list-inline-item">
              <a
                href="#/quocbao"
                className=""
                data-toggle="tooltip"
                data-placement="top"
                title="Profile"
                onClick={handleNothing}
              >
                <i className="dripicons-user text-purple"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="#/quocbao"
                className=""
                data-toggle="tooltip"
                data-placement="top"
                title="Settings"
                onClick={handleNothing}
              >
                <i className="dripicons-gear text-dark"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="#/quocbao"
                className=""
                data-toggle="tooltip"
                data-placement="top"
                title="Sign out"
                onClick={handleSignOut}
              >
                <i className="dripicons-power text-danger"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-inner slimscrollleft">
          <div id="sidebar-menu">
            <ul>
              <li className="menu-title">FEATURE</li>
              <li className="has_sub">
                <a href="#/quocbao" onClick={(e) => e.preventDefault()} className="waves-effect">
                  <i className="fas fa-book-open"></i> <span> Course Manage </span>
                  <span className="float-right">
                    <i className="mdi mdi-chevron-right"></i>
                  </span>
                </a>
                <ul className="list-unstyled">
                  <li>
                    <a href="/course">
                      <i className="fas fa-table"></i> Get list
                    </a>
                  </li>
                  <li>
                    <a href="/course/create">
                      <i className="ion-android-add"></i> Create
                    </a>
                  </li>
                  <li>
                    <a href="/course/trash">
                      <i className="ion-android-trash"></i> Trash Bin
                    </a>
                  </li>
                </ul>
              </li>

              <li className="menu-title">ADMIN AREA</li>
              {JSON.parse(localStorage.getItem("user") || "{}")?.isAdmin && (
                <li className="has_sub">
                  <a href="#/quocbao" onClick={(e) => e.preventDefault()} className="waves-effect">
                    <i className="fas fa-user-friends"></i> <span> User Manage </span>
                    <span className="float-right">
                      <i className="mdi mdi-chevron-right"></i>
                    </span>
                  </a>
                  <ul className="list-unstyled">
                    <li>
                      <a href="/user">
                        <i className="fas fa-table"></i> Get list
                      </a>
                    </li>
                    <li>
                      <a href="/user/create">
                        <i className="ion-android-add"></i> Create
                      </a>
                    </li>
                    <li>
                      <a href="/user/trash">
                        <i className="ion-android-trash"></i> Trash Bin
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
        {/* end sidebarinner */}
      </div>
    </>
  );
};

export default TheLeftBar;
