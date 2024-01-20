const ForgotPasswordPage = () => {
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
            <div className="alert alert-success alert-dismissible">
              <button type="button" className="close" data-dismiss="alert" aria-hidden="true">
                ×
              </button>
              Enter your <b>Email</b> and instructions will be sent to you!
            </div>

            <div className="form-group row">
              <div className="col-12">
                <input className="form-control" type="email" required={true} placeholder="Email" />
              </div>
            </div>

            <div className="form-group text-center row m-t-20">
              <div className="col-12">
                <button className="btn btn-danger btn-block waves-effect waves-light" type="submit">
                  Send Email
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
