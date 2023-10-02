import { ArtistDTO, PostArtistDTO } from '../../src/api/logics/dto/artist-dto';
import artistController from '../../src/api/controllers/artist-controller';
import artistLogic from '../../src/api/logics/artist-logic';
import {
  PostArtistNoParamErrorTestCases,
  PostArtistWrongParamErrorTestCases,
  PostArtistSuccessTestCases,
  GetArtistWrongParamErrorTestCases,
  GetArtistSuccessTestCases
} from './mocks/artist-controller.mock';

// cria uma falsificação da classe ArtistLogic, importada pelo Controller
jest.mock('../../src/api/logics/artist-logic', () => {
  return {
    // falsificação do método createArtist
    createArtist: async (postArtist: PostArtistDTO): Promise<ArtistDTO> => {
      return { id: 1, ...postArtist };
    },
    // falsificação do método getArtist
    getArtist: async (artistId: number): Promise<ArtistDTO> => {
      // retorna null, pois seu retorno será implementado individualmente nos testes
      return null;
    }
  };
});

// nomeia a coleção de testes
describe('Suit Test for Artist Controller', () => {
  // testa o método POST com parâmetros obrigatórios não enviados
  test('POST - Should return error 400 if any required parameter is not sent', async () => {
    for (const test of PostArtistNoParamErrorTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const createArtistSpy = jest.spyOn(artistLogic, 'createArtist');

      // chama o método postArtist com os parâmetros de teste
      await artistController.postArtist(test.params.req, test.params.res);

      // testa o comportamento do método postArtist através das variáveis espiãs
      expect(createArtistSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      createArtistSpy.mockClear();
    }
  });

  // testa o método POST com parâmetros de tipo errado
  test('POST - Should return error 400 if any parameter is not of correct type', async () => {
    for (const test of PostArtistWrongParamErrorTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const createArtistSpy = jest.spyOn(artistLogic, 'createArtist');

      // chama o método postArtist com os parâmetros de teste
      await artistController.postArtist(test.params.req, test.params.res);

      // testa o comportamento do método postArtist através das variáveis espiãs
      expect(createArtistSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      createArtistSpy.mockClear();
    }
  });

  // testa o método POST com parâmetros válidos
  test('POST - Should call Logic with correct DTO', async () => {
    for (const test of PostArtistSuccessTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const createArtistSpy = jest.spyOn(artistLogic, 'createArtist');

      // chama o método postArtist com os parâmetros de teste
      await artistController.postArtist(test.params.req, test.params.res);

      // testa o comportamento do método postArtist através das variáveis espiãs
      expect(createArtistSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(createArtistSpy).toBeCalledWith(test.expectedLogicCalledWith);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      createArtistSpy.mockClear();
    }
  });

  // testa o método GET com parâmetros de tipo errado
  test('GET - Should return error 400 if parameter is not of correct type', async () => {
    for (const test of GetArtistWrongParamErrorTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const getArtistSpy = jest.spyOn(artistLogic, 'getArtist');

      // chama o método getArtist com os parâmetros de teste
      await artistController.getArtist(test.params.req, test.params.res);

      // testa o comportamento do método getArtist através das variáveis espiãs
      expect(getArtistSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      getArtistSpy.mockClear();
    }
  });

  // testa o método GET com parâmetros de tipo errado
  test('GET - Should call Logic with correct parameters', async () => {
    for (const test of GetArtistSuccessTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const getArtistSpy = jest.spyOn(artistLogic, 'getArtist');

      // força o retorno do método falsificado de ArtistLogic
      getArtistSpy.mockResolvedValueOnce(test.expectedMessage);

      // chama o método getArtist com os parâmetros de teste
      await artistController.getArtist(test.params.req, test.params.res);

      // testa o comportamento do método getArtist através das variáveis espiãs
      expect(getArtistSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(getArtistSpy).toBeCalledWith(test.expectedLogicCalledWith);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      getArtistSpy.mockClear();
    }
  });
});
