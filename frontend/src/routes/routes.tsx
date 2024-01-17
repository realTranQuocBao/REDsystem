import React from "react";
// const DataTablePage = React.lazy(() => import("views/template/pages/TablePage"));

const Demone = () => <div>hihi</div>;

const routes = [
  {
    name: "AnalyticPage",
    path: "/",
    component: Demone,
  },
  {
    name: "Course",
    path: "/course",
    component: Demone,
  },
  {
    name: "Data Table",
    path: "/datatable",
    component: Demone,
  },
  {
    name: "Demo page",
    path: "demo",
    component: Demone,
  },
];

export default routes;
