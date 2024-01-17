// import cors from "cors";

import { NextFunction, RequestHandler } from "express";

// const allowedOrigins = [
//     'http://127.0.0.1',
//     'http://localhost'
// ];

// const corsMiddleware = cors({
//     origin: (origin, callback) => {

//         // Allow requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);

//         if (allowedOrigins.includes(origin)) {
//             return callback(null, true);
//         }

//         return callback(new Error('Not allowed by CORS'));
//     },
//     credentials: true,
// });

const corsMiddleware: RequestHandler = (req, res, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    // res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token');
    // res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');


    // Continue to the next middleware
    next();
}


export default corsMiddleware;