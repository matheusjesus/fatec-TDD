import { AlbumDTO, PostAlbumDTO } from '../../src/api/logics/dto/album-dto';
import albumController from '../../src/api/controllers/album-controller';
import albumLogic from '../../src/api/logics/album-logic';
import {
  PostAlbumNoParamErrorTestCases,
  PostAlbumWrongParamErrorTestCases,
  PostAlbumSuccessTestCases,
  GetAlbumWrongParamErrorTestCases,
  GetAlbumSuccessTestCases,
  PostAlbumLogicErrorTestCases
} from './mocks/album-controller.mock';

// cria uma falsificação da classe AlbumLogic, importada pelo Controller
jest.mock('../../src/api/logics/album-logic', () => {
  return {
    // falsificação do método createAlbum
    createAlbum: async (postAlbum: PostAlbumDTO): Promise<AlbumDTO> => {
      // retorna um ÁlbumDTO com id fixo 1
      return { id: 1, ...postAlbum };
    },
    // falsificação do método getAlbum
    getAlbum: async (albumId: number): Promise<{ createdAlbum: AlbumDTO, err: string }> => {
      // retorna null, pois seu retorno será implementado individualmente nos testes
      return { createdAlbum: null, err: null };
    }
  };
});

// nomeia a coleção de testes
describe('Suit Test for Album Controller', () => {
  // testa o método POST com parâmetros obrigatórios não enviados
  test('POST - Should return error 400 if any required parameter is not sent', async () => {
    for (const test of PostAlbumNoParamErrorTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const createAlbumSpy = jest.spyOn(albumLogic, 'createAlbum');

      // chama o método postAlbum com os parâmetros de teste
      await albumController.postAlbum(test.params.req, test.params.res);

      // testa o comportamento do método postAlbum através das variáveis espiãs
      expect(createAlbumSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      createAlbumSpy.mockClear();
    }
  });

  // testa o método POST com parâmetros de tipo errado
  test('POST - Should return error 400 if any parameter is not of correct type', async () => {
    for (const test of PostAlbumWrongParamErrorTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const createAlbumSpy = jest.spyOn(albumLogic, 'createAlbum');

      // chama o método postAlbum com os parâmetros de teste
      await albumController.postAlbum(test.params.req, test.params.res);

      // testa o comportamento do método postAlbum através das variáveis espiãs
      expect(createAlbumSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      createAlbumSpy.mockClear();
    }
  });

  // testa o método POST com erro retornado da Logic
  test('POST - Should return error 400 if Logic returns an error', async () => {
    for (const test of PostAlbumLogicErrorTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const createAlbumSpy = jest.spyOn(albumLogic, 'createAlbum');

      // força o retorno da função createAlbum do Logic
      createAlbumSpy.mockResolvedValueOnce(test.returnFromLogic);

      // chama o método postAlbum com os parâmetros de teste
      await albumController.postAlbum(test.params.req, test.params.res);

      // testa o comportamento do método postAlbum através das variáveis espiãs
      expect(createAlbumSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(createAlbumSpy).toBeCalledWith(test.expectedLogicCalledWith);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      createAlbumSpy.mockClear();
    }
  });

  // testa o método POST com parâmetros válidos
  test('POST - Should call Logic with correct DTO', async () => {
    for (const test of PostAlbumSuccessTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const createAlbumSpy = jest.spyOn(albumLogic, 'createAlbum');

      // força o retorno da função createAlbum do Logic
      createAlbumSpy.mockResolvedValueOnce(test.returnFromLogic);

      // chama o método postAlbum com os parâmetros de teste
      await albumController.postAlbum(test.params.req, test.params.res);

      // testa o comportamento do método postAlbum através das variáveis espiãs
      expect(createAlbumSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(createAlbumSpy).toBeCalledWith(test.expectedLogicCalledWith);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      createAlbumSpy.mockClear();
    }
  });

  // testa o método GET com parâmetros de tipo errado
  test('GET - Should return error 400 if parameter is not of correct type', async () => {
    for (const test of GetAlbumWrongParamErrorTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const getAlbumSpy = jest.spyOn(albumLogic, 'getAlbum');

      // chama o método getAlbum com os parâmetros de teste
      await albumController.getAlbum(test.params.req, test.params.res);

      // testa o comportamento do método getAlbum através das variáveis espiãs
      expect(getAlbumSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      getAlbumSpy.mockClear();
    }
  });

  // testa o método GET com parâmetros de tipo errado
  test('GET - Should call Logic with correct parameters', async () => {
    for (const test of GetAlbumSuccessTestCases) {
      // cria as variáveis espiãs do jest
      const resStatusCodeSpy = jest.spyOn(test.params.res, 'status');
      const resMessageSpy = jest.spyOn(test.params.res, 'json');
      const getAlbumSpy = jest.spyOn(albumLogic, 'getAlbum');

      // força o retorno do método falsificado de AlbumLogic
      getAlbumSpy.mockResolvedValueOnce(test.expectedMessage);

      // chama o método getAlbum com os parâmetros de teste
      await albumController.getAlbum(test.params.req, test.params.res);

      // testa o comportamento do método getAlbum através das variáveis espiãs
      expect(getAlbumSpy).toBeCalledTimes(test.expectedLogicCalledTimes);
      expect(getAlbumSpy).toBeCalledWith(test.expectedLogicCalledWith);
      expect(resStatusCodeSpy).toBeCalledWith(test.expectedStatusCode);
      expect(resMessageSpy).toBeCalledWith(test.expectedMessage);

      // limpa os contadores da variável espiã
      getAlbumSpy.mockClear();
    }
  });
});