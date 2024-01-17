import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ICourse } from "models/course.model";
import courseService from "services/course.service";

const CoursePage = () => {
  const [counter, setCounter] = useState(0);
  const [courses, setCourses] = useState<ICourse[]>([]);
  // const [course, setCourse] = useState<ICourse | null>(null);
  const [params, setParams] = useState({
    search: "React",
    filterby: "React",
    filterquery: "React",
    sort: "React",
    order: "React",
    PageIndex: 1,
    PageSize: 10
  });

  useEffect(() => {
    courseService.get(params).then((res) => {
      // setCourses((state) => ({ name: state }));

      console.log("hihi", res.data.items);
    });
  }, [counter, params]);
  return (
    <>
      <h1>Queo cơm</h1>
      <Button
        onClick={() => {
          setCounter((st) => st + 2);
        }}
      >
        Clicked {counter} time(s)
      </Button>
      {courses}
    </>
  );
};

export default CoursePage;
