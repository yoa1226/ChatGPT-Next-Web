// server.ts
import express, { Request, Response } from 'express';
import next from 'next';
import usersRouter from './app/server/routers/users';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use('/api/users', usersRouter);

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(3000, (err?: Error) => {
    if (err) throw err;
    console.log('Server started on port 3000');
  });
});