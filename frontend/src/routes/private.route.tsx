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

const privateRoute = [
  {
    breadcrumb: "Course",
    title: "Get list Courses",
    path: "/course",
    component: CoursePage
  },
  {
    breadcrumb: "Create",
    title: "Add new Course",
    path: "/course/create",
    component: CourseCreatePage
  },
  {
    breadcrumb: "Edit",
    title: "Edit Course",
    path: "/course/edit/:idParam",
    component: CourseEditPage
  },
  {
    breadcrumb: "Trash",
    title: "Get Courses in Trash",
    path: "/course/trash",
    component: CourseTrashPage
  },
  {
    breadcrumb: "User",
    title: "Get list Users",
    path: "/user",
    component: UserPage
  },
  {
    breadcrumb: "Create",
    title: "Add new User",
    path: "/user/create",
    component: UserCreatePage
  },
  {
    breadcrumb: "Edit",
    title: "Edit User",
    path: "/user/edit/:idParam",
    component: UserEditPage
  },
  {
    breadcrumb: "Trash",
    title: "Get Users in Trash",
    path: "/user/trash",
    component: UserTrashPage
  },

  //TEST
  {
    breadcrumb: "DEMO",
    title: "Test Data Table",
    path: "demo",
    component: Demone
  },
  {
    breadcrumb: "DEMO",
    title: "Demo page",
    path: "test",
    component: TestPage
  }
];

export default privateRoute;
