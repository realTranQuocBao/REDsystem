import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "routes/index";

import TheLayoutBlank from "views/components/TheLayoutBlank";

import ThePrivateRoute from "views/components/ThePrivateRoute";

// import CoursePage from "views/course/pages/CoursePage";
import SignInPage from "views/authencation/pages/SignInPage";
import ForgotPasswordPage from "views/authencation/pages/ForgotPasswordPage";
import RegisterPage from "views/authencation/pages/RegisterPage";
import ErrorPage from "views/misc/pages/ErrorPage";

function App() {
  return (
    <>
      {/* <CoursePage /> */}
      <TheLayoutBlank />
      <Routes>
        {/* PUBLIC-ROUTE */}
        <Route path="/" element={<TheLayoutBlank />}>
          <Route path="forgot" element={<ForgotPasswordPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="404-not-found" Component={ErrorPage} />
          <Route path="under-maintenance" element={<ErrorPage />} />
          {/* Can add landing page introduce project at path="" */}
          <Route path="" element={<Navigate to="/dashboard" replace />} />
        </Route>
        {/* /PUBLIC-ROUTE */}

        {/* PRIVATE-ROUTE */}
        <Route path="/" element={<ThePrivateRoute />}>
          {routes.map((route, index) => {
            return route.component && <Route path={route.path} Component={route.component} key={index} />;
          })}
          <Route path="*" element={<Navigate to="/404-not-found" replace />} />;
        </Route>
        {/* /PRIVATE-ROUTE */}
      </Routes>
    </>
  );
}

export default App;
