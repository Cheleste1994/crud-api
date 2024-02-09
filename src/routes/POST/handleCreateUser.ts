import { User } from '../../data/users';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';

export function handleCreateUser(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  users: User[]
) {
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

      const newUser: User = {
        id: `${Number(users[users.length - 1]?.id) + 1}`,
        uuid: uuidv4(),
        username: userData.username,
        age: userData.age,
        hobbies: userData.hobbies,
      };
      users.push(newUser);

      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: 'Invalid JSON' }));
    }
  });
}
