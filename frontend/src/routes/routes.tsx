import React from "react";
const TestPage = React.lazy(() => import("views/course/pages/TestPage"));
const CourseTrashPage = React.lazy(() => import("views/course/pages/CourseTrashPage"));
const CourseCreatePage = React.lazy(() => import("views/course/pages/CourseCreatePage"));
const CoursePage = React.lazy(() => import("views/course/pages/CoursePage"));
const CourseEditPage = React.lazy(() => import("views/course/pages/CourseEditPage"));
const UserTrashPage = React.lazy(() => import("views/user/pages/UserTrashPage"));
const UserCreatePage = React.lazy(() => import("views/user/pages/UserCreatePage"));
const UserPage = React.lazy(() => import("views/user/pages/UserPage"));
const UserEditPage = React.lazy(() => import("views/user/pages/UserEditPage"));

const Demone = () => <div>hihi</div>;

const routes = [
  {
    name: "Get list Courses",
    path: "/course",
    component: CoursePage
  },
  {
    name: "Add new Course",
    path: "/course/create",
    component: CourseCreatePage
  },
  {
    name: "Edit Course",
    path: "/course/edit/:idCourse",
    component: CourseEditPage
  },
  {
    name: "Get Courses in Trash",
    path: "/course/trash",
    component: CourseTrashPage
  },
  {
    name: "Get list Users",
    path: "/user",
    component: UserPage
  },
  {
    name: "Add new User",
    path: "/user/create",
    component: UserCreatePage
  },
  {
    name: "Edit User",
    path: "/user/edit/:idUser",
    component: UserEditPage
  },
  {
    name: "Get Users in Trash",
    path: "/user/trash",
    component: UserTrashPage
  },

  //TEST
  {
    name: "Test Data Table",
    path: "demo",
    component: Demone
  },
  {
    name: "Demo page",
    path: "test",
    component: TestPage
  }
];

export default routes;
