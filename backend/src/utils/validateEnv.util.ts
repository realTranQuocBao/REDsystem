import { cleanEnv, num, port, str } from "envalid";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_URI: str(),
    PORT: port(),
    KEY_AVAILABILITY_TIME: num(),
    MIN_TIME_TO_CREATE_KEY: num(),
    ACCESS_JWT_SECRET: str(),
    ACCESS_TOKEN_EXPIRES_IN_MINUTE: num(),
    REFRESH_JWT_SECRET: str(),
    REFRESH_TOKEN_EXPIRES_IN_MINUTE: num(),
})