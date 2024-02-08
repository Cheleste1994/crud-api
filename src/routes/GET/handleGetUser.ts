import http from 'http';
import { User } from 'server';

export function handleGetUser(
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
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(user));
}
