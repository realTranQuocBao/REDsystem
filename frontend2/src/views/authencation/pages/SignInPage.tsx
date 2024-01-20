import "assets/vendor/css/pages/page-auth.css";
import logoImage from "assets/images/logo.png";
import React, { useEffect, useState } from "react";
import authApi from "services/auth.service";
import { Navigate } from "react-router-dom";

const SignInPage = () => {
  document.querySelector("html")?.classList.add("customizer-hide");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.accessToken) {
      setRedirect(true);
    }
  }, []);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    //start loading
    const data = {
      email,
      password
    };
    authApi
      .signin(data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.items));
        //end loading
        setRedirect(true);
      })
      .catch((err) => {
        //end loading
        if (err?.message) {
          alert(err.message);
        }
      });

    event.preventDefault();
  };

  if (redirect) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      {/* Content */}
      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner">
            {/* SignIn Card */}
            <div className="card">
              <div className="card-body">
                {/* Logo */}
                <div className="app-brand justify-content-center">
                  <a href="index.html" className="app-brand-link gap-2">
                    <span className="app-brand-logo demo">
                      <img src={logoImage} alt="Logo" className="logo" />
                    </span>
                    <span className="app-brand-text demo text-body fw-bold">tranquocbao</span>
                  </a>
                </div>
                {/* /Logo */}
                <h4 className="mb-2">Welcome to REDsystem! 👋</h4>
                <p className="mb-4">Please sign-in to your account and start the adventure</p>

                <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={onEmailChange}
                      autoFocus
                    />
                  </div>
                  <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <a href="forgot-password">
                        <small>Forgot Password?</small>
                      </a>
                    </div>
                    <div className="input-group input-group-merge">
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={onPasswordChange}
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        aria-describedby="password"
                      />
                      <span className="input-group-text cursor-pointer">
                        <i className="bx bx-hide"></i>
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember-me" />
                      <label className="form-check-label" htmlFor="remember-me">
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary d-grid w-100" type="submit">
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="text-center">
                  <span>New on our platform?</span>
                  <a href="signup">
                    <span>Create an account</span>
                  </a>
                </p>
              </div>
            </div>
            {/* /SignIn Card */}
          </div>
        </div>
      </div>
      {/* / Content */}
    </>
  );
};

export default SignInPage;
