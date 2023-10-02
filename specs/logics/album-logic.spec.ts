import { AlbumDTO } from '../../src/api/logics/dto/album-dto';
import { ArtistDTO } from '../../src/api/logics/dto/artist-dto';
import albumLogic from '../../src/api/logics/album-logic';
import albumRepository from '../../src/api/repositories/album-repository';
import artistRepository from '../../src/api/repositories/artist-repository';
import { CreateAlbumTestCases, GetAlbumTestCases, artistMock } from './mocks/album-logic.mock';

// cria uma falsificação da classe AlbumRepository, importada pelo Logic
jest.mock('../../src/api/repositories/album-repository', () => {
  return {
    // falsificação do método count, que retorna sempre 0
    count: async (): Promise<number> => {
      return 0;
    },
    // falsificação do método create, que não faz nada
    create: async (): Promise<void> => { },
    // falsificação do método find, que retorna null pois seu retorno será implementado individualmente nos testes
    find: async (): Promise<AlbumDTO> => {
      return null;
    },
  }
});

// cria uma falsificação da classe ArtistRepository, importada pelo Logic
jest.mock('../../src/api/repositories/artist-repository', () => {
  return {
    // falsificação do método find
    find: async (): Promise<ArtistDTO> => {
      return artistMock;
    },
    // falsificação do método update, que não faz nada
    update: async (updatedArtist: ArtistDTO): Promise<void> => { },
  }
});

// nomeia a coleção de testes
describe('Suit Test for Album Logic', () => {
  // testa se método createAlbum obtém um Id de acordo com o esperado
  test('createAlbum - Should get a proper Id for new Album', async () => {
    for (let i = 0; i < CreateAlbumTestCases.length; i++) {
      const test = CreateAlbumTestCases[i];

      // cria as variáveis espiãs do jest
      const countSpy = jest.spyOn(albumRepository, 'count');

      // força o retorno da função count
      countSpy.mockResolvedValueOnce(i);

      // chama o método createAlbum com os parâmetros de teste
      const { createdAlbum, err } = await albumLogic.createAlbum(test.params.album);

      // testa o comportamento do método createAlbum através das variáveis espiãs
      expect(countSpy).toBeCalledTimes(1);
      expect(err).toBeNull();
      expect(createdAlbum.id).toBe(i + 1);

      // limpa os contadores da variável espiã
      countSpy.mockClear();
    }
  });

  // testa se método createAlbum retorna erro se o artista não for cadastrado
  test('createAlbum - Should return error if artist ID does not exist', async () => {
    for (let i = 0; i < CreateAlbumTestCases.length; i++) {
      const test = CreateAlbumTestCases[i];

      // cria as variáveis espiãs do jest
      const createSpy = jest.spyOn(albumRepository, 'create');
      const artistFindSpy = jest.spyOn(artistRepository, 'find');
      const artistUpdateSpy = jest.spyOn(artistRepository, 'update');

      // força o retorno da função find do repositório
      artistFindSpy.mockResolvedValueOnce(undefined);

      // chama o método createAlbum com os parâmetros de teste
      const { createdAlbum, err } = await albumLogic.createAlbum(test.params.album);

      // testa o comportamento do método createAlbum através das variáveis espiãs
      expect(createSpy).toBeCalledTimes(0);
      expect(artistFindSpy).toBeCalledWith(test.params.album.artistId);
      expect(artistUpdateSpy).toBeCalledTimes(0);
      expect(err).toBe(`Artist ID not found! Please create the artist in the system.`);
      expect(createdAlbum).toBeNull();

      // limpa os contadores das variáveis espiãs
      createSpy.mockClear();
      artistFindSpy.mockClear();
      artistUpdateSpy.mockClear();
    }
  });

  // testa se método createAlbum cria um novo álbum e o retorna
  test('createAlbum - Should save new album to Repository', async () => {
    for (let i = 0; i < CreateAlbumTestCases.length; i++) {
      const test = CreateAlbumTestCases[i];

      // cria as variáveis espiãs do jest
      const createSpy = jest.spyOn(albumRepository, 'create');
      const countSpy = jest.spyOn(albumRepository, 'count');

      // força o retorno da função count
      countSpy.mockResolvedValueOnce(i);

      // chama o método createAlbum com os parâmetros de teste
      const { createdAlbum, err } = await albumLogic.createAlbum(test.params.album);

      // testa o comportamento do método createAlbum através das variáveis espiãs
      expect(createSpy).toBeCalledTimes(1);
      expect(err).toBeNull();
      expect(createdAlbum).toStrictEqual(test.expectedReturnValue);

      // limpa os contadores das variáveis espiãs
      countSpy.mockClear();
      createSpy.mockClear();
    }
  });

  // testa se método createAlbum atualiza os álbuns do Artista ao adicionar um novo álbum
  test('createAlbum - Should save new album Artist albums', async () => {
    for (let i = 0; i < CreateAlbumTestCases.length; i++) {
      const test = CreateAlbumTestCases[i];

      // cria as variáveis espiãs do jest
      const countSpy = jest.spyOn(albumRepository, 'count');
      const artistFindSpy = jest.spyOn(artistRepository, 'find');
      const artistUpdateSpy = jest.spyOn(artistRepository, 'update');

      // força o retorno da função count
      countSpy.mockResolvedValueOnce(i);

      // chama o método createAlbum com os parâmetros de teste
      const { createdAlbum, err } = await albumLogic.createAlbum(test.params.album);

      // testa o comportamento do método createAlbum através das variáveis espiãs
      expect(artistFindSpy).toBeCalledWith(test.params.album.artistId);
      expect(artistUpdateSpy).toBeCalledWith(artistMock);
      expect(err).toBeNull();
      expect(createdAlbum).toStrictEqual(test.expectedReturnValue);

      // limpa os contadores das variáveis espiãs
      countSpy.mockClear();
      artistFindSpy.mockClear();
      artistUpdateSpy.mockClear();
    }
  });

  // testa se método getAlbum retorna o álbum corretamente
  test('getAlbum - Should get album from Repository', async () => {
    for (const test of GetAlbumTestCases) {
      // cria as variáveis espiãs do jest
      const findSpy = jest.spyOn(albumRepository, 'find');

      // força o retorno da função find do repositório
      findSpy.mockResolvedValueOnce(test.expectedReturnValue);

      // chama o método getAlbum com os parâmetros de teste
      const album = await albumLogic.getAlbum(test.params.albumId);

      // testa o comportamento do método getAlbum através das variáveis espiãs
      expect(findSpy).toBeCalledTimes(1);
      expect(album).toStrictEqual(test.expectedReturnValue);

      // limpa os contadores da variável espiã
      findSpy.mockClear();
    }
  });
});
