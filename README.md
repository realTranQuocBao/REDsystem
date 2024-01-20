# Cập nhật:

- Demo: [todo.quocbaoit.com](http://todo.quocbaoit.com)
- Đã cấu trúc lại dự án theo những gì đọc từ bài góp ý Nhựt
- Đã thêm các dialog để xác nhận khi sửa, xóa, cũng như các toast message để thông báo kết quả.

# BACKEND: ./backend

- Do chưa setup kịp project cho mọi người code chung, nên giờ mỗi bạn tự init project giúp a và code 1 project huyền thoại "TODO LIST" nha :d
- Các chức năng cơ bản:

* Thêm, sửa, xóa, tìm kiếm task - Khi thêm cần có lưu lại thời gian thêm task, chỉnh sửa thì lưu lại thời gian chỉnh sửa
* Trạng thái của task gồm 3 trạng thái:
* Check hoàn thành task, lưu lại thời gian hoàn thành.
* Filter được task nào đã done, task nào đang thực hiện.

UI bạn bạn có thể sử dụng lib tùy ý nha, ko cần code UI chay
Dữ liệu lưu các task mọi người có thể sử dụng tùy ý nha: redux, local storage, session storage,..

Mọi người push code lên github, gitlab,... Xong đưa a review qua nha, Thanks ae

Những lib mọi người có thể tham khảo qua, nếu thấy xài được vào thì sử dụng nhé :

- redux: quản lý dữ liệu
- lodash: xử lí array,object,collection,..
- react hook form: xử lí form trên reactjs
- moment: xử lí về thời gian
- styled components: custom ui

# Demo

![Header](https://github.com/realTranQuocBao/todolist-react/raw/main/public/demo/demo1.png)
![Body](https://github.com/realTranQuocBao/todolist-react/raw/main/public/demo/demo2.png)
![For mobile](https://github.com/realTranQuocBao/todolist-react/raw/main/public/demo/demo3.png)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

<h1 align='center'>
🚀 MERN Markdown Blog
</h1>
<p align='center'>
MongoDB, ExpressJs, ReactJs, NodeJs
</p>

A blogging application made with the MERN stack with **Dockerization** and **TypeScript** as the backend language.

![App Screenshot](./screenshot.png)

# 💻 Getting Started

Cloning the repository

```bash
$ git clone https://github.com/HotPotatoC/mern-markdown-blog.git

$ cd mern-markdown-blog
```

## 🐳 Running with docker-compose

To start the application with docker, make sure you have [**docker-compose**](https://docs.docker.com/compose/install/) installed.

```bash
$ docker-compose -v
```

If you already have docker-compose installed, Build the containers

```bash
$ docker-compose build
```

Run the application

```bash
$ docker-compose up -d
```

The ReactJs application will run on _http://localhost:3000_ and the Express application will run on _http://localhost:5000_

To stop the application run

```bash
$ docker-compose stop
```

## 💽 Running without docker-compose

To run the application without using docker. Run your MongoDB service

```bash
$ sudo service mongodb start
```

Starting the server application

```bash
$ cd server
$ yarn install
$ yarn dev
```

Starting the client application

```bash
$ cd client
$ yarn install
$ yarn start
```

The ReactJs application will run on _http://localhost:3000_ and the Express application will run on _http://localhost:5000_

# 🛠 Tools & Packages

### Client-Side

| Package Name                                                      | Description                                                                | Version |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------- | ------- |
| [axios](https://github.com/axios/axios)                           | Promise based HTTP client for the browser and node.js                      | ^0.19.2 |
| [highlight.js](https://highlightjs.org/)                          | Syntax highlighting with language autodetection.                           | ^10.1.2 |
| [moment](https://momentjs.com)                                    | Parse, validate, manipulate, and display dates                             | ^2.27.0 |
| [react-feather](https://github.com/feathericons/react-feather)    | React component for Feather icons                                          | ^2.0.8  |
| [react-highlight](https://github.com/akiran/react-highlight)      | React component for syntax highlighting                                    | ^0.12.0 |
| [react-markdown](https://github.com/rexxars/react-markdown)       | Renders Markdown as React components                                       | ^4.3.1  |
| [react-moment](https://github.com/headzoo/react-moment)           | React component for the moment date library.                               | ^0.9.7  |
| [react-router-dom](https://github.com/ReactTraining/react-router) | DOM bindings for React Router                                              | ^5.2.0  |
| [tailwindcss](https://tailwindcss.com)                            | A utility-first CSS framework for rapidly building custom user interfaces. | ^1.5.2  |

### Server-Side

| Package Name                                                              | Description                                                                     | Version |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| [joi](https://github.com/sideway/joi)                                     | Object schema validation                                                        | ^17.1.1 |
| [@typegoose/typegoose](https://typegoose.github.io/typegoose/)            | Define Mongoose models using TypeScript classes                                 | ^7.3.0  |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js)                      | A bcrypt library for NodeJS.                                                    | ^5.0.0  |
| [cors](https://github.com/expressjs/cors)                                 | Node.js CORS middleware                                                         | ^2.8.5  |
| [dotenv](https://github.com/motdotla/dotenv)                              | Loads environment variables from .env file                                      | ^8.2.0  |
| [express](http://expressjs.com/)                                          | Fast, unopinionated, minimalist web framework                                   | ^4.17.1 |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)                | JSON Web Token implementation (symmetric and asymmetric)                        | ^8.5.1  |
| [mongoose](https://mongoosejs.com)                                        | Mongoose MongoDB ODM                                                            | 5.9.22  |
| [mongoose-paginate-v2](https://github.com/aravindnc/mongoose-paginate-v2) | A cursor based custom pagination library for Mongoose with customizable labels. | ^1.3.9  |
| [morgan](https://github.com/expressjs/morgan)                             | HTTP request logger middleware for node.js                                      | ^1.10.0 |
| [slugify](https://github.com/simov/slugify)                               | Slugifies a String                                                              | ^1.4.4  |
| [nodemon](https://nodemon.io)                                             | Simple monitor script for use during development of a node.js app.              | ^2.0.4  |
