import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app = express();

// parser / middleware
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

const getAController = async (req: Request, res: Response) => {
  // Promise.reject();
  res.send('Blogs server is running');
};

app.get('/', getAController);

// error handle route
app.use(globalErrorHandler);
//Not Found
app.use(notFound);
export default app;
