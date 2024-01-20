import { useEffect, useState } from "react";
import { ICourse, ICourseFormValues } from "models/course.model";
import courseService from "services/course.service";
import useLoading from "hooks/useLoading.hook";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CourseCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICourseFormValues>();

  const alertify = (window as any).alertify;
  useLoading(loading);
  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = (data: ICourse) => {
    setLoading(true);
    console.log("Check", "start:loading");
    courseService
      .create(data)
      .then((res) => {
        setLoading(false);
        console.log("Check", "stop:loading");

        if ((res as any)?.message) {
          console.log("Check", "alert");

          alertify.success((res as any).message);
        }

        return navigate(`/course/edit/${(res as any)?.data.items._id}`);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Check", "stop:loading");
        if (err?.message) {
          alertify.error(err.message);
        }
      });
  };

  console.log("errors", errors);
  //  {errors.name && <p>{errors.name.message}</p>}

  const backToList = () => {
    navigate("/course");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("name", { required: "Course name cannot be empty." })}
          />
          {errors.name && <p className="error m-1 mt-0">{errors.name.message}</p>}
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
            {...register("category", { required: "Must choose uniform for the course." })}
          >
            <option value="">Select course's category</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Business">Business</option>
            <option value="Personal Development">Personal Development</option>
            <option value="Other!">Other!</option>
          </select>
          {errors.category && <p className="error m-1 mt-0">{errors.category.message}</p>}
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="level" className="col-sm-2 col-form-label">
          Level
        </label>
        <div className="col-sm-10">
          <select
            id="level"
            className="custom-select"
            {...register("level", { required: "Must choose level for the course." })}
          >
            <option value="">Select course's level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Other!">Other!</option>
          </select>
          {errors.level && <p className="error m-1 mt-0">{errors.level.message}</p>}
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
            className="form-control"
            placeholder="Enter course's price"
            {...register("price", { required: "Must enter price for course.", min: 0 })}
          />
          {errors.price && <p className="error m-1 mt-0">{errors.price.message}</p>}
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
            className="form-control"
            placeholder="Learning duration is ... hour(s)"
            {...register("duration", { required: "Course duration must be declared.", min: 0, maxLength: 10000 })}
          />
          {errors.duration && <p className="error m-1 mt-0">{errors.duration.message}</p>}
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
            {...register("language", { required: "Course language must be declared.", maxLength: 120 })}
          />
          {errors.language && <p className="error m-1 mt-0">{errors.language.message}</p>}
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
            {...register("instructor", { required: "Course instuctor must be declared.", maxLength: 120 })}
          />
          {errors.instructor && <p className="error m-1 mt-0">{errors.instructor.message}</p>}
        </div>
      </div>

      <div className="form-group mb-0 d-flex justify-content-center">
        <button type="submit" className="btn btn-outline-success  mr-5">
          Create
        </button>
        <button type="button" onClick={backToList} className="btn btn-outline-info ml-5">
          Back to the list
        </button>
      </div>
    </form>
  );
};

export default CourseCreatePage;
