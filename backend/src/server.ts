import 'dotenv/config';
import env from "./util/validateEnv"
import app from "./app";
import mongoose from "mongoose";

const PORT: number = Number(env.PORT ?? 5000);

mongoose.connect(env.MONGO_CONNECTION_URI!)
    .then(() => {
        console.log(`Mongoose Connected!`);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.error(`Mongoose Connection Failed: ${err}`);
    });