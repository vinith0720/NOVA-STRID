import express, { Request, Response, NextFunction } from 'express';
import Zoorouter from '@routers/zooroute';
import Animalrouter from '@routers/animalroute';
import { erroHandler } from '@middleware/errorHandleMiddleware';
const app = express();

// Built-in middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/zoo', Zoorouter);
app.use('/animal', Animalrouter);

// Define GET route on "/"
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Express is Working !!!' });
});

app.use(erroHandler);

export default app;
