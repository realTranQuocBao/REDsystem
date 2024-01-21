- **API DOCUMENTATION** _(POSTMAN)_: [https://documenter.getpostman.com/view/14635131/2s9YsQ8qJP](https://documenter.getpostman.com/view/14635131/2s9YsQ8qJP)

# PROJECT CONFIGURATION GUIDE

## A. BACKEND NODEJS:

### 1. Create `.env` file in the backend directory:

```
# DATABASE
MONGO_CONNECTION_URI=mongodb+srv://baotran:XXXXXXXXXXXXXXXX@cluster0.x7c5av0.mongodb.net/REDsystemDB?retryWrites=true&w=majority

# SERVER: development || production
PORT=5000
NODE_ENV=development

# RESET PASSWORD
MIN_TIME_TO_CREATE_KEY=60000
KEY_AVAILABILITY_TIME=3600000

# JWT
ACCESS_JWT_SECRET=REDsystem20240116
ACCESS_TOKEN_EXPIRES_IN_MINUTE=60
REFRESH_JWT_SECRET=REDsystem20240116refresh
REFRESH_TOKEN_EXPIRES_IN_MINUTE=1320
```

> For security reasons, XXXXXXXXXXXXXXXX will be sent via email.

### 2. Run the following command to install packages and launch the Backend:

```
$ npm run beapp
```

> The backend will be launched by default at `http://localhost:5000/api/v1/`

### 3. Initialize sample data through the api:

```
POST http://localhost:5000/api/v1/import/user
POST http://localhost:5000/api/v1/import/course
```

### 4. The default account created:

| email               | password | role      |
| ------------------- | -------- | --------- |
| admin@redsystem.com | 123456   | Admin     |
| user@redsystem.com  | 123456   | Non-admin |

### 5. Functions:

| method | endpoint                     | description                                                                                                                                                                                                                                                                                                                          |
| ------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/api/v1/import/course`      | Import sample data                                                                                                                                                                                                                                                                                                                   |
| POST   | `/api/v1/import/user`        | Import sample data                                                                                                                                                                                                                                                                                                                   |
| ------ | ---------------------------- | -----------                                                                                                                                                                                                                                                                                                                          |
| POST   | `/api/v1/auth/info`          | Return user data                                                                                                                                                                                                                                                                                                                     |
| POST   | `/api/v1/auth/signup`        |                                                                                                                                                                                                                                                                                                                                      |
| POST   | `/api/v1/auth/signin`        |                                                                                                                                                                                                                                                                                                                                      |
| POST   | `/api/v1/auth/signout`       |                                                                                                                                                                                                                                                                                                                                      |
| POST   | `/api/v1/auth/forgotpass`    |                                                                                                                                                                                                                                                                                                                                      |
| POST   | `/api/v1/auth/resetpass`     |                                                                                                                                                                                                                                                                                                                                      |
| ------ | ---------------------------- | -----------                                                                                                                                                                                                                                                                                                                          |
| POST   | `/api/v1/course`             | Create                                                                                                                                                                                                                                                                                                                               |
| GET    | `/api/v1/course`             | Read list. Use `?deleted=true` to get data that soft-deleted. Search query: `search`. Filter query: `filterby`&&`filterquery`. Sort query: `sort`&&`order`. `sort` in `[name,createdat,updatedat,category,price,level,duration,language,instructor]`. `order` in `[asc,desc]`. `filterby` in `[category,level,language,instructor]`. |
| GET    | `/api/v1/course/:id`         | Read one                                                                                                                                                                                                                                                                                                                             |
| PATCH  | `/api/v1/course/:id`         | Update                                                                                                                                                                                                                                                                                                                               |
| PATCH  | `/api/v1/course/:id/restore` | Update (Restore data soft-deleted)                                                                                                                                                                                                                                                                                                   |
| DELETE | `/api/v1/course/:id`         | Soft delete (run once) / Delete permanently (run twice)                                                                                                                                                                                                                                                                              |
| ------ | ---------------------------- | -----------                                                                                                                                                                                                                                                                                                                          |
| POST   | `/api/v1/user`               | Create                                                                                                                                                                                                                                                                                                                               |
| GET    | `/api/v1/user`               | Read list. Use `?deleted=true` to get data that soft-deleted                                                                                                                                                                                                                                                                         |
| GET    | `/api/v1/user/:id`           | Get one                                                                                                                                                                                                                                                                                                                              |
| PATCH  | `/api/v1/user/:id`           | Update                                                                                                                                                                                                                                                                                                                               |
| PATCH  | `/api/v1/user/:id/restore`   | Update (Restore data soft-deleted)                                                                                                                                                                                                                                                                                                   |
| DELETE | `/api/v1/user/:id`           | Soft delete (run once) / Delete permanently (run twice)                                                                                                                                                                                                                                                                              |

## B. FRONTEND REACTJS:

### 1. Create `.env` file in the backend directory:

```
REACT_APP_API_ENDPOINT=http://localhost:5000/api/v1
REACT_APP_PUBLIC_URL=http://localhost:3000
```

> For security reasons, XXXXXXXXXXXXXXXX will be sent via email.

### 2. Run the following command to install packages and launch the Backend:

```
$ npm run feapp
```

> The backend will be launched by default at `http://localhost:3000/`

### 3. Functions:

- Course management -> CRUD (all user)
- User management -> CRUD (admin user)
