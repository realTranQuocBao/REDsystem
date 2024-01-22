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
  // const [filterBy, setFilterBy] = useState("");
  // const [filterQuery, setFilterQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
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
      search: search
      // filterby: filterBy,
      // filterquery: filterQuery,
    };

    const cleanedParams = Object.fromEntries(Object.entries(newParams).filter(([k, v]) => v));
    setParams(cleanedParams);
  }, [search, sort, order]);

  useEffect(() => {
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
      {/* SORT CONTROL - START */}
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Sort type</label>
        <div
          className="col-md-9 d-flex flex-wrap align-content-around"
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

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Sort by</label>
        <div
          className="col-md-9 d-flex flex-wrap align-content-around"
          style={{ paddingTop: "calc(.375rem + 1px)", paddingBottom: "calc(.375rem + 1px)" }}
        >
          <div className="custom-control custom-radio mr-3 mb-1">
            <input
              id="sortName"
              className="custom-control-input"
              type="radio"
              value="name"
              checked={sort === "name"}
              onChange={() => setSort("name")}
              name="sort"
            />
            <label className="custom-control-label" htmlFor="sortName">
              name
            </label>
          </div>

          <div className="custom-control custom-radio mr-3 mb-1">
            <input
              id="sortUpdatedAt"
              className="custom-control-input"
              type="radio"
              value="updatedat"
              checked={sort === "updatedat"}
              onChange={() => setSort("updatedat")}
              name="sort"
            />
            <label className="custom-control-label" htmlFor="sortUpdatedAt">
              updatedAt
            </label>
          </div>

          <div className="custom-control custom-radio mr-3 mb-1">
            <input
              id="sortCreatedAt"
              className="custom-control-input"
              type="radio"
              value="createdat"
              checked={sort === "createdat"}
              onChange={() => setSort("createdat")}
              name="sort"
            />
            <label className="custom-control-label" htmlFor="sortCreatedAt">
              createdAt
            </label>
          </div>

          <div className="custom-control custom-radio mr-3 mb-1">
            <input
              id="sortPrice"
              className="custom-control-input"
              type="radio"
              value="price"
              checked={sort === "price"}
              onChange={() => setSort("price")}
              name="sort"
            />
            <label className="custom-control-label" htmlFor="sortPrice">
              price
            </label>
          </div>

          <div className="custom-control custom-radio mr-3 mb-1">
            <input
              id="sortDuration"
              className="custom-control-input"
              type="radio"
              value="duration"
              checked={sort === "duration"}
              onChange={() => setSort("duration")}
              name="sort"
            />
            <label className="custom-control-label" htmlFor="sortDuration">
              duration
            </label>
          </div>

          <div className="custom-control custom-radio mr-3 mb-1">
            <input
              id="sortLanguage"
              className="custom-control-input"
              type="radio"
              value="language"
              checked={sort === "language"}
              onChange={() => setSort("language")}
              name="sort"
            />
            <label className="custom-control-label" htmlFor="sortLanguage">
              language
            </label>
          </div>

          <div className="custom-control custom-radio mr-3 mb-1">
            <input
              id="sortInstructor"
              className="custom-control-input"
              type="radio"
              value="instructor"
              checked={sort === "instructor"}
              onChange={() => setSort("instructor")}
              name="sort"
            />
            <label className="custom-control-label" htmlFor="sortInstructor">
              instructor
            </label>
          </div>

          <div className="custom-control custom-radio mr-3 mb-1">
            <input
              id="sortLevel"
              className="custom-control-input"
              type="radio"
              value="level"
              checked={sort === "level"}
              onChange={() => setSort("level")}
              name="sort"
            />
            <label className="custom-control-label" htmlFor="sortLevel">
              level
            </label>
          </div>

          <div className="custom-control custom-radio mr-3 mb-1">
            <input
              id="sortCategory"
              className="custom-control-input"
              type="radio"
              value="category"
              checked={sort === "category"}
              onChange={() => setSort("category")}
              name="sort"
            />
            <label className="custom-control-label" htmlFor="sortCategory">
              category
            </label>
          </div>
        </div>
      </div>
      {/* SORT CONTROL - END */}

      {/* SEARCH CONTROL - START */}
      <div className="form-group row">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Search
        </label>
        <div className="col-sm-5 input-group">
          <input
            aria-label="Search for..."
            type="text"
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
      {/* SEARCH CONTROL - END */}

      <CourseTable courses={courses} />
    </>
  );
};

export default CoursePage;
