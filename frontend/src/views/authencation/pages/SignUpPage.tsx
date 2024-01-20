const SignUpPage = () => {
  return (
    <>
      <div className="card-body">
        <div className="text-center m-b-15">
          <a href="index.html" className="logo logo-admin">
            <img src="/assets/images/logo-name.png" height="24" alt="logo" />
          </a>
        </div>

        <div className="p-3">
          <form className="form-horizontal" action="index.html">
            <div className="form-group row">
              <div className="col-12">
                <input className="form-control" type="email" required={true} placeholder="Email" />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12">
                <input className="form-control" type="text" required={true} placeholder="Username" />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12">
                <input className="form-control" type="password" required={true} placeholder="Password" />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-12">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label font-weight-normal" htmlFor="customCheck1">
                    I accept
                    <a href="/terms-conditions" className="text-muted">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group text-center row m-t-20">
              <div className="col-12">
                <button className="btn btn-danger btn-block waves-effect waves-light" type="submit">
                  Register
                </button>
              </div>
            </div>

            <div className="form-group m-t-10 mb-0 row">
              <div className="col-12 m-t-20 text-center">
                <a href="pages-login.html" className="text-muted">
                  Already have account?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
