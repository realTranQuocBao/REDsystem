import { useEffect, useState } from "react";
import { ICourse, ICourseFormValues } from "models/course.model";
import courseService from "services/course.service";
import useLoading from "hooks/useLoading.hook";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getTimeHMDMY } from "utils";

const CourseEditPage = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState(true);

  const { idParam } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICourseFormValues>();
  const alertify = (window as any).alertify;

  useLoading(loading);

  const loadData = () => {
    setLoading(true);
    if (idParam)
      courseService
        .getById(idParam)
        .then((res) => {
          setCourse(res.data.items);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err?.message) {
            alertify.error(err.message);
          }
        });
  };

  useEffect(() => {
    if (idParam) {
      console.log(idParam);
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idParam]);

  const onSubmit = (data: ICourse) => {
    if (idParam) {
      setLoading(true);
      console.log("Check", "start:loading");
      courseService
        .update(idParam, data)
        .then((res) => {
          setLoading(false);
          console.log("Check", "stop:loading");
          if ((res as any)?.message) {
            console.log("Check", "alert");

            alertify.success((res as any).message);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("Check", "stop:loading");
          if (err?.message) {
            alertify.error(err.message);
          }
        });
    }
  };

  console.log("errors", errors);
  //  {errors.name && <p>{errors.name.message}</p>}

  const backToList = () => {
    navigate("/course");
  };

  return (
    <>
      {course && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group row">
            <label htmlFor="courseId" className="col-sm-2 col-form-label">
              ID
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="courseId" disabled value={course?._id} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Enter course's name..."
                id="name"
                defaultValue={course?.name}
                {...register("name", {})}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="category" className="col-sm-2 col-form-label">
              Category
            </label>
            <div className="col-sm-10">
              <select
                id="category"
                className="custom-select"
                defaultValue={course?.category}
                {...register("category", {})}
              >
                <option>Select course's category</option>
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
                <option value="Personal Development">Personal Development</option>
                <option value="Other!">Other!</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="level" className="col-sm-2 col-form-label">
              Level
            </label>
            <div className="col-sm-10">
              <select id="level" className="custom-select" defaultValue={course?.level} {...register("level", {})}>
                <option>Select course's level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Other!">Other!</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="price" className="col-sm-2 col-form-label">
              Price
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                id="price"
                step="0.01"
                defaultValue={course?.price}
                className="form-control"
                placeholder="Enter course's price"
                {...register("price", { min: 0 })}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="duration" className="col-sm-2 col-form-label">
              Duration
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                id="duration"
                step="0.01"
                className="form-control"
                defaultValue={course?.duration}
                placeholder="Learning duration is ... hour(s)"
                {...register("duration", { min: 0, maxLength: 10000 })}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="language" className="col-sm-2 col-form-label">
              Language
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="The course will be taught in ... language."
                id="language"
                defaultValue={course?.language}
                {...register("language", { maxLength: 120 })}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="instructor" className="col-sm-2 col-form-label">
              Instructor
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="The course will be taught by ..."
                id="instructor"
                defaultValue={course?.instructor}
                {...register("instructor", { maxLength: 120 })}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="instructor" className="col-sm-2 col-form-label">
              Created
            </label>
            <ul>
              <li>At: {course?.createdAt ? getTimeHMDMY(course.createdAt) : "Unknown"}</li>
              <li>By: {(course?.createdBy as any)?.email || course?.createdBy || "Unknown"}</li>
            </ul>
          </div>
          <div className="form-group row">
            <label htmlFor="instructor" className="col-sm-2 col-form-label">
              Updated
            </label>
            <ul>
              <li>At: {course?.updatedAt ? getTimeHMDMY(course.updatedAt) : "Unknown"}</li>
              <li>By: {(course?.updatedBy as any)?.email || course?.updatedBy || "Unknown"}</li>
            </ul>
          </div>

          <div className="form-group mb-0 d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-success  mr-5">
              Save
            </button>
            <button type="button" onClick={backToList} className="btn btn-outline-info ml-5">
              Back to the list
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CourseEditPage;
