import { users } from '../../data/users';
import http from 'http';

export function handleGetUsers(res: http.ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(users));
}
