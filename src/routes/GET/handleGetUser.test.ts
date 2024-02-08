import { users } from '../../data/users';
import { IncomingMessage, ServerResponse } from 'http';
import { handleGetUser } from './handleGetUser';

describe('handleGetUser', () => {
  test('should, if no URL is passed, return an error', () => {
    let result;

    const reqMock = {} as unknown as IncomingMessage;

    const resMock = {
      statusCode: null,
      end: (data: string) => {
        result = data;
      },
    } as unknown as ServerResponse;

    handleGetUser(reqMock, resMock);

    expect(result).toBe('{"message":"Invalid userId"}');
  });

  test('should, if id not found, return an error', () => {
    let result;

    const reqMock = { url: '100500' } as unknown as IncomingMessage;

    const resMock = {
      statusCode: null,
      end: (data: string) => {
        result = data;
      },
    } as unknown as ServerResponse;

    handleGetUser(reqMock, resMock);

    expect(result).toBe("{\"message\":\"User not found\"}");
  });

  test('should, if id is correct, return user', () => {
    let result;

    const reqMock = { url: '1' } as unknown as IncomingMessage;

    const resMock = {
      statusCode: null,
      end: (data: string) => {
        result = data;
      },
      setHeader: jest.fn(),
    } as unknown as ServerResponse;

    handleGetUser(reqMock, resMock);

    expect(JSON.parse(result || '')).toStrictEqual(users[0]);
  });
});
