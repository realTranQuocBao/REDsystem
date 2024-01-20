import { useEffect, useState } from "react";
import useLoading from "hooks/useLoading.hook";
import UserTable from "../components/UserTable";
import { IUser } from "models/user.model";
import userService from "services/user.service";

const UserPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
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
    userService
      .get(params)
      .then((res) => {
        setUsers(res.data.items);
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
      <UserTable users={users} />
    </>
  );
};

export default UserPage;
