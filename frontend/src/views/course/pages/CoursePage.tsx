import { useEffect, useState } from "react";
import { ICourse } from "models/course.model";
import courseService from "services/course.service";
import useLoading from "hooks/useLoading.hook";
import CourseTable from "../components/CourseTable";

const CoursePage = () => {
  // const [counter, setCounter] = useState(0);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("updatedat");
  const [filterBy, setFilterBy] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [params, setParams] = useState<{
    search?: string;
    filterby?: string;
    filterquery?: string;
    sort?: string;
    order?: string;
  }>({
    search: undefined,
    filterby: undefined,
    filterquery: undefined,
    sort: undefined,
    order: undefined
  });

  const alertify = (window as any).alertify;

  useLoading(loading);

  useEffect(() => {
    const newParams = {
      sort: sort,
      order: order,
      search: search,
      filterby: filterBy,
      filterquery: filterQuery.replace(`${filterBy}>>`, "")
    };

    const cleanedParams = Object.fromEntries(Object.entries(newParams).filter(([k, v]) => v));
    setParams(cleanedParams);
  }, [search, sort, order, filterBy, filterQuery]);

  useEffect(() => {
    console.log("params", params);

    setLoading(true);
    courseService
      .get(params)
      .then((res) => {
        setCourses(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err?.message) {
          alertify.error(err.message);
        }
      });
  }, [params]);

  const onSearchClick = () => {
    setSearch(searchValue);
  };

  const onSearchEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      setSearch(searchValue);
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-success btn-sm mb-3 mt-0 mt-auto mr-auto"
        style={{ width: "100%" }}
        type="button"
        data-toggle="collapse"
        data-target="#dataFilterControl"
        onClick={() => {
          setShowControlPanel(!showControlPanel);
        }}
      >
        <i className={`fas fa-chevron-${showControlPanel ? "up" : "down"}`}></i>
        {showControlPanel ? " Hide" : " Show"} Control Panel&nbsp;
        <i className={`fas fa-chevron-${showControlPanel ? "up" : "down"}`}></i>
      </button>

      <div className="collapse" id="dataFilterControl">
        {/* SORT CONTROL - START */}
        <div className="card mb-1">
          <div className="card-body pt-2 pb-2">
            <div className="form-group row mb-0">
              <label className="col-sm-2 col-form-label">Sort by</label>
              <div
                className="col-sm-10 d-flex flex-wrap align-content-around"
                style={{ paddingTop: "calc(.375rem + 1px)", paddingBottom: "calc(.375rem + 1px)" }}
              >
                <select
                  className="custom-select col-sm-12"
                  name="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="name">name</option>
                  <option value="updatedat">updatedAt (dafault)</option>
                  <option value="createdat">createdAt</option>
                  <option value="price">price</option>
                  <option value="duration">duration</option>
                  <option value="language">language</option>
                  <option value="instructor">instructor</option>
                  <option value="level">level</option>
                  <option value="category">category</option>
                </select>
              </div>
            </div>

            <div className="form-group row mb-0">
              <label className="col-sm-2 col-form-label">Sort type</label>
              <div
                className="col-sm-9 d-flex flex-wrap align-content-around"
                style={{ paddingTop: "calc(.375rem + 1px)", paddingBottom: "calc(.375rem + 1px)" }}
              >
                <div className="custom-control custom-radio mr-3 mb-1">
                  <input
                    id="orderAscending"
                    className="custom-control-input"
                    type="radio"
                    value="asc"
                    checked={order === "asc"}
                    onChange={() => setOrder("asc")}
                    name="order"
                  />
                  <label className="custom-control-label" htmlFor="orderAscending">
                    Ascending
                  </label>
                </div>

                <div className="custom-control custom-radio mr-3 mb-1">
                  <input
                    id="orderDescending"
                    className="custom-control-input"
                    type="radio"
                    value="desc"
                    checked={order === "desc"}
                    onChange={() => setOrder("desc")}
                    name="order"
                  />
                  <label className="custom-control-label" htmlFor="orderDescending" style={{ maxWidth: "200px" }}>
                    Descending
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SORT CONTROL - END */}

        {/* FILTER CONTROL - START */}
        <div className="card mb-1">
          <div className="card-body pt-2 pb-2">
            <div className="form-group row mb-0">
              <label className="col-sm-2 col-form-label">Filer by level</label>
              <div
                className="col-sm-10 d-flex flex-wrap align-content-around"
                style={{ paddingTop: "calc(.375rem + 1px)", paddingBottom: "calc(.375rem + 1px)" }}
              >
                <select
                  className="custom-select"
                  name="filter"
                  value={filterQuery}
                  onChange={(e) => {
                    setFilterBy("level");
                    setFilterQuery(e.target.value);
                  }}
                >
                  <option value="level>>"></option>
                  <option value="level>>Beginner">Beginner</option>
                  <option value="level>>Intermediate">Intermediate</option>
                  <option value="level>>Advanced">Advanced</option>
                  <option value="level>>Other!">Other!</option>
                </select>
              </div>
            </div>

            <div className="form-group row mb-0">
              <label className="col-sm-2 col-form-label">Filer by category</label>
              <div
                className="col-sm-10 d-flex flex-wrap align-content-around"
                style={{ paddingTop: "calc(.375rem + 1px)", paddingBottom: "calc(.375rem + 1px)" }}
              >
                <select
                  className="custom-select"
                  name="filter"
                  value={filterQuery}
                  onChange={(e) => {
                    setFilterBy("category");
                    setFilterQuery(e.target.value);
                  }}
                >
                  <option value="category>>"></option>
                  <option value="category>>Business">Business</option>
                  <option value="category>>Design">Design</option>
                  <option value="category>>Marketing">Marketing</option>
                  <option value="category>>Personal Development">Personal Development</option>
                  <option value="category>>Programming">Programming</option>
                  <option value="category>>Other!">Other!</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* FILTER CONTROL - END */}

        {/* SEARCH CONTROL - START */}
        <div className="card">
          <div className="card-body pt-2 pb-2">
            <div className="form-group row mb-0">
              <label htmlFor="searh" className="col-sm-2 col-form-label">
                Search
              </label>
              <div className="col-sm-5 input-group">
                <input
                  aria-label="Search for..."
                  type="text"
                  id="searh"
                  className="form-control"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for..."
                  onKeyDown={onSearchEnter}
                />
                <span className="input-group-append">
                  <button className="btn btn-primary" type="button" onClick={onSearchClick}>
                    <i className="fas fa-search"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* SEARCH CONTROL - END */}
      </div>

      <CourseTable courses={courses} />
    </>
  );
};

export default CoursePage;
