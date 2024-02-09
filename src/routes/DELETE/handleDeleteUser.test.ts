import { users } from '../../data/users';
import { IncomingMessage, ServerResponse } from 'http';
import { handleDeleteUser } from './handleDeleteUser';

describe('handleDeleteUser', () => {
  test('should, if no URL is passed, return an error', () => {
    let result;

    const reqMock = {} as unknown as IncomingMessage;

    const resMock = {
      statusCode: null,
      end: (data: string) => {
        result = data;
      },
    } as unknown as ServerResponse;

    handleDeleteUser(reqMock, resMock, users);

    expect(resMock.statusCode).toBe(400);
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

    handleDeleteUser(reqMock, resMock, users);

    expect(resMock.statusCode).toBe(404);
    expect(result).toBe('{"message":"User not found"}');
  });

  test('should, if id is correct, delete user', () => {
    const reqMock = { url: '1' } as unknown as IncomingMessage;

    const resMock = {
      statusCode: null,
      end: jest.fn(),
      setHeader: jest.fn(),
    } as unknown as ServerResponse;

    expect(users.map((us) => us.id).includes('1')).toBe(true);

    handleDeleteUser(reqMock, resMock, users);

    expect(resMock.statusCode).toBe(204);
    expect(users.map((us) => us.id).includes('1')).toBe(false);
  });
});
