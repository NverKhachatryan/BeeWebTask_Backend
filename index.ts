// import express, { Express, Request, Response } from 'express';
// import dotenv from 'dotenv';

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

import userRoutes from './routes/userRoutes';
import workspaceRoutes from './routes/workspaceRoutes';

import express from 'express';
import bodyParser from 'body-parser';

const dbConnect = require("./dbConnect");

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', // this should match the domain in your error message
    credentials: true,
  }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRoutes);
app.use('/workspace', workspaceRoutes);
dbConnect();

app.listen(5000, () => console.log(`Server started on port:5000`));

export default app; 