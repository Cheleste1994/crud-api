import { User } from '../../data/users';
import http from 'http';

export function handleUpdateUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  users: User[],
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

  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userData = JSON.parse(body);

      if (
        !userData.username ||
        !userData.age ||
        !Array.isArray(userData.hobbies)
      ) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'Invalid user data' }));
        return;
      }

      users[userIndex] = {
        ...(users[userIndex] as User),
        username: userData.username,
        age: userData.age,
        hobbies: userData.hobbies,
      };

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(users[userIndex]));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
  });
}
