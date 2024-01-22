import { useEffect, useState } from "react";
import useLoading from "hooks/useLoading.hook";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getTimeHMDMY } from "utils";
import { IUser, IUserFormValues } from "models/user.model";
import userService from "services/user.service";

const UserEditPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { idParam } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUserFormValues>();
  const alertify = (window as any).alertify;

  useLoading(loading);

  const loadData = () => {
    setLoading(true);
    if (idParam)
      userService
        .getById(idParam)
        .then((res) => {
          setUser(res.data.items);
          setIsAdmin(res.data.items.isAdmin);
          setIsDisabled(res.data.items.isDisabled);
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

  const onSubmit = (data: IUser) => {
    if (idParam) {
      setLoading(true);
      console.log("Check", "start:loading");
      userService
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
    navigate("/user");
  };

  return (
    <>
      {user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group row">
            <label htmlFor="userId" className="col-sm-2 col-form-label">
              ID
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="userId" disabled value={user?._id} />
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
                placeholder="Enter your name..."
                id="name"
                defaultValue={user?.name}
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
                placeholder="Enter your email"
                defaultValue={user?.email}
                disabled
              />
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

          <div className="form-group row">
            <label htmlFor="instructor" className="col-sm-2 col-form-label">
              Created
            </label>
            <ul>
              <li>At: {user?.createdAt ? getTimeHMDMY(user.createdAt) : "Unknown"}</li>
              <li>By: {(user?.createdBy as any)?.email || user?.createdBy || "Unknown"}</li>
            </ul>
          </div>
          <div className="form-group row">
            <label htmlFor="instructor" className="col-sm-2 col-form-label">
              Updated
            </label>
            <ul>
              <li>At: {user?.updatedAt ? getTimeHMDMY(user.updatedAt) : "Unknown"}</li>
              <li>By: {(user?.updatedBy as any)?.email || user?.updatedBy || "Unknown"}</li>
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

export default UserEditPage;
