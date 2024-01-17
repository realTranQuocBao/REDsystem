import express from "express";
import morgan from "morgan";
import routes from "./routes/index.route";
import middlewares from "./middlewares";

const app = express();

//init middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static('public'));
app.use(middlewares.corsMiddleware)

//init db

//init routes
routes(app);

//handle error
app.use(middlewares.errorMiddleware.notFound);
app.use(middlewares.errorMiddleware.errorHandler);

export default app;