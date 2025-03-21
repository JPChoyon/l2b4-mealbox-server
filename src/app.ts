import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app = express();

// parser / middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      // 'https://car-management-delta.vercel.app',
    ],
    credentials: true,
  }),
);

// application routes
app.use('/api', router);

const getAController = async (req: Request, res: Response) => {
  // Promise.reject();
  res.send('Meal Box server is running');
};

app.get('/', getAController);

// error handle route
app.use(globalErrorHandler);
//Not Found
app.use(notFound);
export default app;
