import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes.js';

const app = express();

app.use(bodyParser.json());
app.use(routes);
app.use(cors());

export default app