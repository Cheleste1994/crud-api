import { users } from './data/users';
import 'dotenv/config';
import http from 'http';
import { handleRoutes } from './routes/routes';

const PORT = process.env.PORT || '4000';

const server = http.createServer((req, res) => {
  const description = [
    {
      'Url:': req.url,
      'Type request:': req.method,
    },
  ];
  console.table(description);
  handleRoutes(req, res, users);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
