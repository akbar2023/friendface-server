import { Router, Request, Response } from 'express';
import { ChatRoutes } from './chat.routes';
import { BoardRoutes } from './board.routes';

export class ApplicationRoutes {
  static getRoutes(): Router {
    const router = Router();

    router.get('/', (req: Request, res: Response) => {
      res.send('Friendface API');
    });

    router.use('/chat', ChatRoutes.getRoutes());
    router.use('/board', BoardRoutes.getRoutes());

    return router;
  }
}
