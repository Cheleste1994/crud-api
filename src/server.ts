import 'dotenv/config';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT || '4000';

interface User {
  id: string;
  uuid: string;
  username: string;
  age: number;
  hobbies: string[];
}

let users: User[] = [
  {
    id: '1',
    uuid: uuidv4(),
    username: 'Ivan',
    age: 29,
    hobbies: ['racing'],
  },
  {
    id: '2',
    uuid: uuidv4(),
    username: 'Andrei',
    age: 12,
    hobbies: ['sky', 'music'],
  },
];

const server = http.createServer((req, res) => {
  console.log('Url:', req.url);
  console.log('Type request:', req.method);

  switch (req.method) {
    case 'GET':
      if (req.url === '/api/users') {
        handleGetUsers(res);
        return;
      }
      if (req.url?.startsWith('/api/users/')) {
        handleGetUser(req, res);
        return;
      }
      handleNotFound(res);
      break;
    case 'POST':
      if (req.url === '/api/users') {
        handleCreateUser(req, res);
        return;
      }
      handleNotFound(res);
      break;
    case 'PUT':
      if (req.url?.startsWith('/api/users/')) {
        handleUpdateUser(req, res);
        return;
      }
      handleNotFound(res);
      break;
    case 'DELETE':
      if (req.url?.startsWith('/api/users/')) {
        handleDeleteUser(req, res);
        return;
      }
      handleNotFound(res);
      break;
    default:
      res.end();
  }
});

function handleGetUsers(res: http.ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(users));
}

function handleGetUser(req: http.IncomingMessage, res: http.ServerResponse) {
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

function handleCreateUser(req: http.IncomingMessage, res: http.ServerResponse) {
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

function handleUpdateUser(req: http.IncomingMessage, res: http.ServerResponse) {
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
      const userData = JSON.parse(body) as User;
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

function handleDeleteUser(req: http.IncomingMessage, res: http.ServerResponse) {
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

function handleNotFound(res: http.ServerResponse) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route not found' }));
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
