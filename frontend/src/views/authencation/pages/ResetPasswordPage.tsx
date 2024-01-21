import useLoading from "hooks/useLoading.hook";
import { IApiResponse } from "models/apiResponse.model";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import authService from "services/auth.service";

const ResetPasswordPage = () => {
  const { key } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false);
  const alertify = (window as any).alertify;
  const navigate = useNavigate();

  useLoading(loading);

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.accessToken) {
      setLoading(true);
      setRedirect(true);
    }
  }, []);

  useEffect(() => {
    if (key) {
      console.log(key);
    }
  }, [key]);

  const onPass1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass1(event.target.value);
  };
  const onPass2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass2(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    if (pass1 === pass2) {
      setLoading(true);
      const data = {
        newPassword: pass1,
        key: key
      };
      authService
        .resetPassword(data)
        .then((res) => {
          const resApi = res as IApiResponse;
          if (resApi?.message) {
            alertify.success(resApi.message);
          }

          navigate("/signin", { replace: true });
        })
        .catch((err) => {
          if (err?.message) {
            alertify.error(err.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alertify.error("Passwords do not match");
    }

    event.preventDefault();
  };

  if (redirect) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <div className="card-body">
        <div className="text-center m-b-15">
          <a href="index.html" className="logo logo-admin">
            <img src="/assets/images/logo-name.png" height="24" alt="logo" />
          </a>
        </div>

        <div className="p-3">
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className="alert alert-success alert-dismissible">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">
                ×
              </button>
              Congratulations, please update your new password!
            </div>

            <div className="form-group row">
              <div className="col-12">
                <input
                  className="form-control"
                  type="password"
                  value={pass1}
                  onChange={onPass1Change}
                  required={true}
                  placeholder="Enter new Password"
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12">
                <input
                  className="form-control"
                  type="password"
                  value={pass2}
                  onChange={onPass2Change}
                  required={true}
                  placeholder="Enter new Password again"
                />
              </div>
            </div>

            <div className="form-group text-center row m-t-20">
              <div className="col-12">
                <button className="btn btn-danger btn-block waves-effect waves-light" type="submit">
                  Reset
                </button>
              </div>
            </div>

            <div className="form-group m-t-10 mb-0 row">
              <div className="col-12 m-t-20 text-center">
                <a href="/signin" className="text-muted">
                  <i className="mdi mdi-lastpass"></i>
                  <small className="ml-1">Sign In with password</small>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
