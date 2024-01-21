import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import TheLayout from "./TheLayout";
import React, { useEffect, useState } from "react";
import authApi from "services/auth.service";
import { routes } from "routes";
import TheLayoutBlank from "./TheLayoutBlank";
const ForgotPasswordPage = React.lazy(() => import("views/authencation/pages/ForgotPasswordPage"));
const SignInPage = React.lazy(() => import("views/authencation/pages/SignInPage"));
const SignUpPage = React.lazy(() => import("views/authencation/pages/SignUpPage"));
const Error404Page = React.lazy(() => import("views/misc/pages/Error404Page"));
const Error500Page = React.lazy(() => import("views/misc/pages/Error500Page"));

const ThePrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // runs on location, i.e. route, change
    // checkUser();

    //start loading
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.accessToken) {
      authApi
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

  return (
    <>
      <Routes>
        {/* PUBLIC-ROUTE */}
        <Route path="/" element={<TheLayoutBlank />}>
          <Route path="forgotpass" Component={ForgotPasswordPage} />
          <Route path="resetpass" Component={ForgotPasswordPage} />
          <Route path="signin" Component={SignInPage} />
          <Route path="signup" Component={SignUpPage} />
          <Route path="404-error" Component={Error404Page} />
          <Route path="500-error" Component={Error500Page} />
          {/* Can add landing page introduce project at path="" */}
          <Route path="" element={<Navigate to="/course" replace />} />
        </Route>
        {/* /PUBLIC-ROUTE */}

        {/* PRIVATE-ROUTE */}
        <Route path="/" element={<TheLayout />}>
          {routes.map((route, index) => {
            return route.component && <Route path={route.path} Component={route.component} key={index} />;
          })}
          <Route path="*" element={<Navigate to="/404-error" replace />} />;
        </Route>
        {/* /PRIVATE-ROUTE */}
      </Routes>
    </>
  );
};

export default ThePrivateRoute;

// import { TheLayout } from ".";
// import { AnonymousWeekWorkingSchedule } from "../views/anonymous";
// import { ContactOur } from "../views/contactOur";
// import Login from "../views/login/Login";
