import { useEffect, useState } from "react";
import { ICourse } from "models/course.model";
import courseService from "services/course.service";
import useLoading from "hooks/useLoading.hook";
import CourseTable from "../components/CourseTable";

const CourseTrashPage = () => {
  // const [counter, setCounter] = useState(0);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    deleted: true,
    search: "",
    filterby: "",
    filterquery: "",
    sort: "",
    order: ""
  });

  const alertify = (window as any).alertify;

  useLoading(loading);

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

  return (
    <>
      <CourseTable courses={courses} />
    </>
  );
};

export default CourseTrashPage;
