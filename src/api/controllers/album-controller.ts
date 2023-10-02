import { Request, Response } from 'express';
import albumLogic from '../logics/album-logic';

class AlbumController {
  // função para checar se os parâmetros estão preenchidos
  private areEmptyParameters(body: any): boolean {
    if (body.artistId === undefined ||
      body.name === undefined ||
      body.label === undefined ||
      body.year === undefined ||
      body.songs === undefined) {

      return true;
    }

    return false;
  }

  // função para checar se os parâmetros são do tipo especificado
  private areValidParameters(body: any): boolean {
    if (typeof body.name !== 'string' ||
      typeof body.label !== 'string' ||
      typeof body.artistId !== 'number' ||
      typeof body.year !== 'number') {

      return false;
    }

    // realiza a checagem de tipo em cada elemento da lista de 'songs'
    for (const song of body.songs) {
      if (typeof song.id !== 'number' || typeof song.name !== 'string') {
        return false;
      }
    }
    return true;
  }

  // função para criar um novo álbum
  async postAlbum(req: Request, res: Response): Promise<void> {
    try {
      // Retira os parâmetros do corpo da requisição
      const { artistId, name, label, year, songs } = req.body;

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

      // chama a lógica de criação de álbum após todas as checagens
      const { createdAlbum, err } = await albumLogic.createAlbum({ artistId, name, label, year, songs });
      
      // envia erro 400 com a mensagem retornada, se houver
      if (err) {
        res.status(400).json({
          statusCode: 400,
          message: err,
        });

        return;
      }

      // retorna o novo álbum criado
      res.status(200).json(createdAlbum);
    } catch (e) {
      // envia status 500 caso algum erro inesperado ocorra
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  // função para buscar um album
  async getAlbum(req: Request, res: Response): Promise<void> {
    try {
      // Retira os parâmetros da querystring da requisição
      const albumId = parseInt(req.query.albumId as string, 10);

      // checagem de parâmetros válidos envia status 400 se houver erro
      if (isNaN(albumId)) {
        res.status(400).json({
          statusCode: 400,
          message: 'Parameter is not of expected type!',
        });

        return;
      }

      // chama a lógica de busca de álbum após todas as checagens
      const album = await albumLogic.getAlbum(albumId);

      // retorna o álbum encontrado
      res.status(200).json(album);
    } catch (err) {
      // envia status 500 caso algum erro inesperado ocorra
      res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}

export = new AlbumController();
