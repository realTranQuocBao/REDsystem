import { useEffect, useState } from "react";
import useLoading from "hooks/useLoading.hook";
import { useForm } from "react-hook-form";
import { IUserFormValues } from "models/user.model";
import userService from "services/user.service";
import { useNavigate } from "react-router-dom";

const UserCreatePage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserFormValues>();

  const alertify = (window as any).alertify;
  useLoading(loading);
  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = (data: IUserFormValues) => {
    if (data.pass1 === data.pass2) {
      setLoading(true);
      console.log("Check", "start:loading");
      userService
        .create({ ...data, password: data.pass1 })
        .then((res) => {
          setLoading(false);
          console.log("Check", "stop:loading");

          if ((res as any)?.message) {
            console.log("Check", "alert");

            alertify.success((res as any).message);
          }

          navigate(`/user/edit/${(res as any)?.data.items._id}`);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Check", "stop:loading");
          if (err?.message) {
            alertify.error(err.message);
          }
        });
    } else {
      alertify.error("Passwords do not match");
    }
  };

  console.log("errors", errors);
  //  {errors.name && <p>{errors.name.message}</p>}

  const backToList = () => {
    navigate("/user");
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
            placeholder="Enter your name..."
            id="name"
            {...register("name", { required: "You must enter name." })}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email..."
            id="email"
            {...register("email", { required: "You must enter email [IMPORTANT]." })}
          />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password..."
            id="password1"
            {...register("pass1", { required: "You must enter password [IMPORTANT]." })}
          />
          <div className="m-t-10">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password..."
              id="password2"
              {...register("pass2", { required: "You must enter password [IMPORTANT]." })}
            />
          </div>
        </div>
      </div>

      <div className="form-group row">
        <label className="col-md-3 my-2 control-label">isAdmin?</label>
        <div className="col-md-9">
          <div className="radio my-2">
            <div className="custom-control custom-radio">
              <input
                id="isAdminRadioYes"
                className="custom-control-input"
                {...register("isAdmin", { required: "You must choose role." })}
                type="radio"
                value="true"
                checked={isAdmin === true}
                onChange={() => setIsAdmin(true)}
                name="isAdmin"
              />
              <label className="custom-control-label" htmlFor="isAdminRadioYes">
                Yes
              </label>
            </div>
          </div>
          <div className="radio my-2">
            <div className="custom-control custom-radio">
              <input
                id="isAdminRadioNo"
                className="custom-control-input"
                {...register("isAdmin", { required: "You must choose role." })}
                type="radio"
                value="false"
                checked={isAdmin === false}
                onChange={() => setIsAdmin(false)}
                name="isAdmin"
              />
              <label className="custom-control-label" htmlFor="isAdminRadioNo">
                No
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-md-3 my-2 control-label">isDisabled?</label>
        <div className="col-md-9">
          <div className="radio my-2">
            <div className="custom-control custom-radio">
              <input
                id="isDisabledRadioYes"
                className="custom-control-input"
                {...register("isDisabled", { required: "" })}
                type="radio"
                value="true"
                checked={isDisabled === true}
                onChange={() => setIsDisabled(true)}
              />
              <label className="custom-control-label" htmlFor="isDisabledRadioYes">
                Yes
              </label>
            </div>
          </div>
          <div className="radio my-2">
            <div className="custom-control custom-radio">
              <input
                id="isDisabledRadioNo"
                className="custom-control-input"
                {...register("isDisabled", { required: "" })}
                type="radio"
                value="false"
                checked={isDisabled === false}
                onChange={() => setIsDisabled(false)}
              />
              <label className="custom-control-label" htmlFor="isDisabledRadioNo">
                No
              </label>
            </div>
          </div>
        </div>
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
  );
};

export default UserCreatePage;
