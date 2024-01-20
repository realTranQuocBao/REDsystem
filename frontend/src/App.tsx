import React from "react";
import "./App.css";
import ThePrivateRoute from "views/containers/ThePrivateRoute";

function App() {
  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  return (
    <>
      <React.Suspense fallback={loading}>
        <ThePrivateRoute />
      </React.Suspense>
    </>
  );
}

export default App;
