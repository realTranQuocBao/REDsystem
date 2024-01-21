import useLoading from "hooks/useLoading.hook";
import { useEffect, useState } from "react";

const Error500Page = () => {
  const [loading, setLoading] = useState(false);
  useLoading(loading);
  useEffect(() => {
    setLoading(false);
  }, []);
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
