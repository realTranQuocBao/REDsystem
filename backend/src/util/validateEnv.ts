import { cleanEnv, num, port, str } from "envalid";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_URI: str(),
    PORT: port(),
    KEY_AVAILABILITY_TIME: num(),
    MIN_TIME_TO_CREATE_KEY: num()
})