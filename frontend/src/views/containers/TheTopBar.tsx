import React from "react";

const TheTopBar = () => {
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
        return (window.location.href = "/signin");
      }
    });
  };
  return (
    <>
      <div className="topbar">
        <nav className="navbar-custom">
          <ul className="list-inline float-right mb-0">
            {/* language*/}
            <li className="list-inline-item dropdown notification-list hide-phone">
              <a
                className="nav-link dropdown-toggle arrow-none waves-effect text-white"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                English
                <img src="/assets/images/flags/us_flag.jpg" className="ml-2" height="16" alt="" />
              </a>
              <div className="dropdown-menu dropdown-menu-right language-switch">
                <a className="dropdown-item" href="#">
                  <img src="/assets/images/flags/italy_flag.jpg" alt="" height="16" />
                  <span> Italian </span>
                </a>
                <a className="dropdown-item" href="#">
                  <img src="/assets/images/flags/french_flag.jpg" alt="" height="16" />
                  <span> French </span>
                </a>
                <a className="dropdown-item" href="#">
                  <img src="/assets/images/flags/spain_flag.jpg" alt="" height="16" />
                  <span> Spanish </span>
                </a>
                <a className="dropdown-item" href="#">
                  <img src="/assets/images/flags/russia_flag.jpg" alt="" height="16" />
                  <span> Russian </span>
                </a>
              </div>
            </li>
            <li className="list-inline-item dropdown notification-list">
              <a
                className="nav-link dropdown-toggle arrow-none waves-effect"
                data-toggle="dropdown"
                href="#/quocbao"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <i className="dripicons-mail noti-icon"></i>
                <span className="badge badge-danger noti-icon-badge">5</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                {/* item*/}
                <div className="dropdown-item noti-title">
                  <h5>
                    <span className="badge badge-danger float-right">745</span>Messages
                  </h5>
                </div>

                {/* item*/}
                <a href="#/quocbao" className="dropdown-item notify-item">
                  <div className="notify-icon">
                    <img src="/assets/images/users/avatar-2.jpg" alt="user-img" className="img-fluid rounded-circle" />
                  </div>
                  <p className="notify-details">
                    <b>Charles M. Jones</b>
                    <small className="text-muted">Dummy text of the printing and typesetting industry.</small>
                  </p>
                </a>

                {/* item*/}
                <a href="#/quocbao" className="dropdown-item notify-item">
                  <div className="notify-icon">
                    <img src="/assets/images/users/avatar-3.jpg" alt="user-img" className="img-fluid rounded-circle" />
                  </div>
                  <p className="notify-details">
                    <b>Thomas J. Mimms</b>
                    <small className="text-muted">You have 87 unread messages</small>
                  </p>
                </a>

                {/* item*/}
                <a href="#/quocbao" className="dropdown-item notify-item">
                  <div className="notify-icon">
                    <img src="/assets/images/users/avatar-4.jpg" alt="user-img" className="img-fluid rounded-circle" />
                  </div>
                  <p className="notify-details">
                    <b>Luis M. Konrad</b>
                    <small className="text-muted">It is a long established fact that a reader will</small>
                  </p>
                </a>

                {/* All*/}
                <a href="#/quocbao" className="dropdown-item notify-item border-top">
                  View All
                </a>
              </div>
            </li>

            <li className="list-inline-item dropdown notification-list">
              <a
                className="nav-link dropdown-toggle arrow-none waves-effect"
                data-toggle="dropdown"
                href="#/quocbao"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <i className="dripicons-bell noti-icon"></i>
                <span className="badge badge-success noti-icon-badge">2</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-arrow dropdown-menu-lg">
                {/* item*/}
                <div className="dropdown-item noti-title">
                  <h5>
                    <span className="badge badge-danger float-right">87</span>Notification
                  </h5>
                </div>

                {/* item*/}
                <a href="#/quocbao" className="dropdown-item notify-item">
                  <div className="notify-icon bg-primary">
                    <i className="mdi mdi-cart-outline"></i>
                  </div>
                  <p className="notify-details">
                    <b>Your order is placed</b>
                    <small className="text-muted">Dummy text of the printing and typesetting industry.</small>
                  </p>
                </a>

                {/* item*/}
                <a href="#/quocbao" className="dropdown-item notify-item">
                  <div className="notify-icon bg-success">
                    <i className="mdi mdi-message"></i>
                  </div>
                  <p className="notify-details">
                    <b>New Message received</b>
                    <small className="text-muted">You have 87 unread messages</small>
                  </p>
                </a>

                {/* item*/}
                <a href="#/quocbao" className="dropdown-item notify-item">
                  <div className="notify-icon bg-warning">
                    <i className="mdi mdi-glass-cocktail"></i>
                  </div>
                  <p className="notify-details">
                    <b>Your item is shipped</b>
                    <small className="text-muted">It is a long established fact that a reader will</small>
                  </p>
                </a>

                {/* All*/}
                <a href="#/quocbao" className="dropdown-item notify-item border-top">
                  View All
                </a>
              </div>
            </li>

            <li className="list-inline-item dropdown notification-list">
              <a
                className="nav-link dropdown-toggle arrow-none waves-effect nav-user"
                data-toggle="dropdown"
                href="#/quocbao"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <img src="/assets/images/users/avatar-6.jpg" alt="user" className="rounded-circle" />
              </a>
              <div className="dropdown-menu dropdown-menu-right profile-dropdown">
                {/* item*/}
                <div className="dropdown-item noti-title">
                  <h5>Welcome</h5>
                </div>
                <a className="dropdown-item" href="#/quocbao">
                  <i className="mdi mdi-account-circle m-r-5 text-muted"></i>
                  Profile
                </a>
                <a className="dropdown-item" href="#/quocbao">
                  <i className="mdi mdi-wallet m-r-5 text-muted"></i> My Wallet
                </a>
                <a className="dropdown-item" href="#/quocbao">
                  <span className="badge badge-success float-right">5</span>
                  <i className="mdi mdi-settings m-r-5 text-muted"></i>
                  Settings
                </a>
                <a className="dropdown-item" href="#/quocbao">
                  <i className="mdi mdi-lock-open-outline m-r-5 text-muted"></i>
                  Lock screen
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#/quocbao" onClick={handleSignOut}>
                  <i className="mdi mdi-logout m-r-5 text-muted"></i> Sign Out
                </a>
              </div>
            </li>
          </ul>

          <ul className="list-inline menu-left mb-0">
            <li className="float-left">
              <button className="button-menu-mobile open-left waves-light waves-effect">
                <i className="mdi mdi-menu"></i>
              </button>
            </li>
            <li className="hide-phone app-search">
              <form role="search" className="">
                <input type="text" placeholder="Search..." className="form-control" />
                <a href="">
                  <i className="fa fa-search"></i>
                </a>
              </form>
            </li>
          </ul>

          <div className="clearfix"></div>
        </nav>
      </div>
    </>
  );
};

export default TheTopBar;
