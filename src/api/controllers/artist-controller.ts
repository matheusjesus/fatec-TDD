import { Request, Response } from 'express';
import artistLogic from '../logics/artist-logic';

class ArtistController {
  // função para checar se os parâmetros estão preenchidos
  private areEmptyParameters(body: any): boolean {
    if (body.name === undefined ||
      body.isGroup === undefined ||
      body.nationality === undefined ||
      body.albums === undefined) {

      return true;
    }

    return false;
  }

  // função para checar se os parâmetros são do tipo especificado
  private areValidParameters(body: any): boolean {
    if (typeof body.name !== 'string' ||
      typeof body.isGroup !== 'boolean' ||
      typeof body.nationality !== 'string') {

      return false;
    }

    // realiza a checagem de tipo em cada elemento da lista de 'albums'
    for (const album of body.albums) {
      if (typeof album !== 'number') {
        return false;
      }
    }

    return true;
  }

  // função para criar um novo artista
  async postArtist(req: Request, res: Response): Promise<void> {
    try {
      // Retira os parâmetros do corpo da requisição
      const { name, isGroup, nationality, albums } = req.body;

      // checagem de parâmetros vazios envia status 400 se houver erro
      if (this.areEmptyParameters(req.body)) {
        res.status(400).json({
          statusCode: 400,
          message: 'Parameter missing!',
        });

        return;
      }

      // checagem de parâmetros válidos envia status 400 se houver erro
      if (!this.areValidParameters(req.body)) {
        res.status(400).json({
          statusCode: 400,
          message: 'Parameter is not of expected type!',
        });

        return;
      }

      // chama a lógica de criação de artista após todas as checagens
      const artist = await artistLogic.createArtist({ name, isGroup, nationality, albums });

      // retorna o novo artista criado
      res.status(200).json(artist);
    } catch (e) {
      // envia status 500 caso algum erro inesperado ocorra
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  // função para buscar um artista
  async getArtist(req: Request, res: Response): Promise<void> {
    try {
      // Retira os parâmetros da querystring da requisição
      const artistId = parseInt(req.query.artistId as string, 10);

      // checagem de parâmetros válidos envia status 400 se houver erro
      if (isNaN(artistId)) {
        res.status(400).json({
          statusCode: 400,
          message: 'Parameter is not of expected type!',
        });

        return;
      }

      // chama a lógica de busca de artista após todas as checagens
      const artist = await artistLogic.getArtist(artistId);

      // retorna o artista encontrado
      res.status(200).json(artist);
    } catch (err) {
      // envia status 500 caso algum erro inesperado ocorra
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}

export = new ArtistController();
