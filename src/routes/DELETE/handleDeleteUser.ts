import { User } from '../../data/users';
import http from 'http';

export function handleDeleteUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  users: User[]
) {
  const userId = req.url?.split('/').pop();
  if (!userId) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'Invalid userId' }));
    return;
  }

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  users.splice(userIndex, 1);
  res.statusCode = 204;
  res.end();
}
