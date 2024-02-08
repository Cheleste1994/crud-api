import http from 'http';
import { User } from 'server';
import { handleDeleteUser } from './DELETE/handleDeleteUser';
import { handleGetUser } from './GET/handleGetUser';
import { handleGetUsers } from './GET/handleGetUsers';
import { handleCreateUser } from './POST/handleCreateUser';
import { handleUpdateUser } from './PUT/handleUpdateUser';

function handleNotFound(res: http.ServerResponse) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
}

export function handleRoutes(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  users: User[]
) {
  switch (req.method) {
    case 'GET':
      if (req.url === '/api/users') {
        handleGetUsers(res, users);
        return;
      }
      if (req.url?.startsWith('/api/users/')) {
        handleGetUser(req, res, users);
        return;
      }
      handleNotFound(res);
      break;
    case 'POST':
      if (req.url === '/api/users') {
        handleCreateUser(req, res, users);
        return;
      }
      handleNotFound(res);
      break;
    case 'PUT':
      if (req.url?.startsWith('/api/users/')) {
        handleUpdateUser(req, res, users);
        return;
      }
      handleNotFound(res);
      break;
    case 'DELETE':
      if (req.url?.startsWith('/api/users/')) {
        handleDeleteUser(req, res, users);
        return;
      }
      handleNotFound(res);
      break;
    default:
      res.end();
  }
}
