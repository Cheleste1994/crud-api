import { User } from '../../data/users';
import http from 'http';

export function handleGetUsers(res: http.ServerResponse, users: User[]) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(users));
}
