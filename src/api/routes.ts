import { Router } from 'express';
import albumController from './controllers/album-controller';
import artistController from './controllers/artist-controller';

export const configRoutes = (): Router => {
  const router = Router();

  // rota base para teste
  router.route('/').get((req, res) => {
    res.send('hello world!');
  });

  // rota para criar um novo álbum
  router.route('/album').post(async (req, res) => {
    await albumController.postAlbum(req, res);
  });

  // rota para buscar um álbum
  router.route('/album').get(async (req, res) => {
    await albumController.getAlbum(req, res);
  });

  // rota para criar um novo artista
  router.route('/artist').post(async (req, res) => {
    await artistController.postArtist(req, res);
  });

  // rota para buscar um artista
  router.route('/artist').get(async (req, res) => {
    await artistController.getArtist(req, res);
  });

  return router;
}