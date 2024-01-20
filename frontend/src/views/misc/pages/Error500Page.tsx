const Error500Page = () => {
  return (
    <>
      <div className="card-block">
        <div className="ex-page-content text-center">
          <h1 className="">500</h1>
          <h3 className="">Internal Server Error</h3>
          <br />

          <a className="btn btn-danger mb-5 waves-effect waves-light" href="/">
            Back to Dashboard
          </a>
        </div>
      </div>
    </>
  );
};

export default Error500Page;
