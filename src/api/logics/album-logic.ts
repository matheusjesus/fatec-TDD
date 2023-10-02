import albumRepository from '../repositories/album-repository';
import artistRepository from '../repositories/artist-repository';
import { AlbumDTO, PostAlbumDTO } from './dto/album-dto';

class AlbumLogic {
  // função para criar um novo álbum
  async createAlbum(album: PostAlbumDTO): Promise<{ createdAlbum: AlbumDTO, err: string }> {
    // conta quantos álbuns já existem no banco e atribui um novo ID com 
    // base no número de álbuns no banco. Note que isto só é possível porque
    // não existe a função de deletar em nosso banco
    const count = await albumRepository.count();
    const newAlbumId = count + 1;

    // checa se o ID do artista do álbum está cadastrado no sistema
    const artist = await artistRepository.find(album.artistId);
    if (artist === undefined) {
      return { createdAlbum: null, err: 'Artist ID not found! Please create the artist in the system.' };
    }

    // note que isto só é possível porque não existe a função de deletar em nosso banco
    const newAlbum = {
      id: newAlbumId,
      ...album,
    };

    // inicia a criação do novo álbum, com id, no repositório de álbuns
    await albumRepository.create(newAlbum);

    // atualiza os álbuns do artista com o novo álbum criado
    artist.albums.push(newAlbumId);
    await artistRepository.update(artist);

    // retorna o novo álbum criado
    return { createdAlbum: newAlbum, err: null };
  }

  // função para buscar um álbum
  async getAlbum(albumId: number): Promise<AlbumDTO> {
    // busca o álbum no repositório de álbuns
    const album = await albumRepository.find(albumId);

    // retorna o álbum encontrado
    return album;
  }
}

export = new AlbumLogic();
