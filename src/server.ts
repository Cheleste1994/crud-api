import 'dotenv/config';
import http from 'http';
import { handleRoutes } from './routes/routes';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT || '4000';

export interface User {
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

  handleRoutes(req, res, users);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
