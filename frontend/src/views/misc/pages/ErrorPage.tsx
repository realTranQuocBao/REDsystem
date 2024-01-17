import "assets/vendor/css/pages/page-misc.css";
import { useLocation } from "react-router-dom";
import data from "../data";

interface IError {
  path: string;
  title: string;
  description: string;
  img: {
    src: string;
    alt: string;
    dark: string;
    light: string;
  };
}

const ErrorPage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const err: IError | undefined = data.find((errItem) => errItem.path === pathname);

  document.querySelector("html")?.classList.add("light-style");
  document.querySelector("html")?.classList.add("layout-wide");

  return (
    <>
      {/* Error */}
      <div className="container-xxl container-p-y">
        <div className="misc-wrapper">
          <h2 className="mb-2 mx-2">{err?.title}</h2>
          <p className="mb-4 mx-2">{err?.description}</p>
          <a href="/" className="btn btn-primary">
            Back to home
          </a>
          <div className="mt-3">
            <img
              src={err?.img.src}
              alt={err?.img.alt}
              width="500"
              className="img-fluid"
              data-app-dark-img={err?.img.dark}
              data-app-light-img={err?.img.light}
            />
          </div>
        </div>
      </div>
      {/* /Error */}
    </>
  );
};

export default ErrorPage;
