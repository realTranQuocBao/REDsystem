import { Navigate, Route, Routes } from "react-router-dom";
import TheLayout from "./TheLayout";
import React from "react";
import TheLayoutBlank from "./TheLayoutBlank";
import ForgotPasswordPage from "views/authencation/pages/ForgotPasswordPage";
import ResetPasswordPage from "views/authencation/pages/ResetPasswordPage";
import SignInPage from "views/authencation/pages/SignInPage";
import SignUpPage from "views/authencation/pages/SignUpPage";
import Error404Page from "views/misc/pages/Error404Page";
import Error500Page from "views/misc/pages/Error500Page";
import privateRoute from "routes/private.route";

const ThePrivateRoute = () => {
  return (
    <>
      <Routes>
        {/* PUBLIC-ROUTE */}
        <Route path="/" element={<TheLayoutBlank />}>
          <Route path="forgotpass" element={<ForgotPasswordPage />} />
          <Route path="resetpass/:key" element={<ResetPasswordPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="404-error" Component={Error404Page} />
          <Route path="500-error" Component={Error500Page} />
          {/* Can add landing page introduce project at path="" */}
          <Route path="" element={<Navigate to="/course" replace />} />
        </Route>
        {/* /PUBLIC-ROUTE */}

        {/* PRIVATE-ROUTE */}
        <Route path="/" element={<TheLayout />}>
          {privateRoute.map((route, index) => {
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
