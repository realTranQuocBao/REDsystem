import React, { useEffect, useState } from "react";
import authApi from "services/auth.service";
import { Navigate } from "react-router-dom";
import { IApiResponse } from "models/apiResponse.model";
import useLoading from "hooks/useLoading.hook";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const alertify = (window as any).alertify;

  useLoading(loading);

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.accessToken) {
      setRedirect(true);
    } else {
      (window as any).alertify?.success("Not authorized, token failed. Please SignIn 💕");
    }
  }, []);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    setLoading(true);
    const data = {
      email,
      password
    };
    authApi
      .signin(data)
      .then((res) => {
        const resApi = res as IApiResponse;
        if (resApi?.message) {
          alertify.success(resApi?.message);
        }
        localStorage.setItem("user", JSON.stringify(res.data.items));
        setRedirect(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err?.message) {
          alertify.error(err.message);
        }
      });

    event.preventDefault();
  };

  if (redirect) {
    return <Navigate to="/course" replace={true} />;
  }

  return (
    <>
      <div className="card-body">
        <div className="text-center m-b-15">
          <div className="logo logo-admin">
            <img src="/assets/images/logo-name.png" height="24" alt="logo" />
          </div>
        </div>

        <div className="p-3">
          <form className="form-horizontal m-t-20" onSubmit={handleSubmit}>
            <div className="form-group row">
              <div className="col-12">
                <input
                  className="form-control"
                  type="text"
                  value={email}
                  onChange={onEmailChange}
                  required={true}
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12">
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={onPasswordChange}
                  required={true}
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group text-center row m-t-20">
              <div className="col-12">
                <button className="btn btn-danger btn-block waves-effect waves-light" type="submit">
                  Log In
                </button>
              </div>
            </div>

            <div className="form-group m-t-10 mb-0 row">
              <div className="col-sm-7 m-t-20">
                <a href="pages-recoverpw.html" className="text-muted">
                  <i className="mdi mdi-lock"></i>
                  <small>Forgot your password ?</small>
                </a>
              </div>
              <div className="col-sm-5 m-t-20">
                <a href="pages-register.html" className="text-muted">
                  <i className="mdi mdi-account-circle"></i>
                  <small>Create an account ?</small>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
