"use strict";
// import express, { Express, Request, Response } from 'express';
// import dotenv from 'dotenv';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app: Express = express();
// // require database connection 
// const dbConnect = require("./dbConnect");
// // execute database connection 
// dbConnect();
// app.use('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
// app.listen(3000, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:3000`);
// });
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const workspaceRoutes_1 = __importDefault(require("./routes/workspaceRoutes"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbConnect = require("./dbConnect");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/user', userRoutes_1.default);
app.use('/workspace', workspaceRoutes_1.default);
dbConnect();
app.listen(5000, () => console.log(`Server started on port:5000`));
exports.default = app;
