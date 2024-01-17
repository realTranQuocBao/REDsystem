import { Navigate, Outlet } from "react-router-dom";
import TheLayout from "./TheLayout";
import { useEffect, useState } from "react";
import authApi from "services/auth.service";

const ThePrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
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
        });
    }
  }, []);

  return (
    <>
      <TheLayout layoutName="container" isWithoutNavbar={false} isWithoutMenu={false} />
    </>
  );
};

export default ThePrivateRoute;
