import TheContent from "./TheContent";

const TheLayoutBlank = () => {
  return (
    <>
      {/* Loader */}
      <div id="preloader">
        <div id="status">
          <div className="spinner"></div>
        </div>
      </div>

      <div className="accountbg"></div>
      <div className="wrapper-page">
        <div className="card">
          <TheContent />
        </div>
      </div>
    </>
  );
};

export default TheLayoutBlank;
