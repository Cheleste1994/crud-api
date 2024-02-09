import { users } from '../../data/users';
import { ServerResponse } from 'http';
import { handleGetUsers } from './handleGetUsers';

describe('handleGetUsers', () => {
  test('should, return users', () => {
    let result;

    const resMock = {
      statusCode: null,
      end: (data: string) => {
        result = data;
      },
      setHeader: jest.fn(),
    } as unknown as ServerResponse;

    handleGetUsers(resMock, users);

    expect(JSON.parse(result || '')).toStrictEqual(users);
  });
});
