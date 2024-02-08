import 'dotenv/config';
import http from 'http';
import { handleRoutes } from './routes/routes';

const PORT = process.env.PORT || '4000';

const server = http.createServer((req, res) => {
  console.log('Url:', req.url);
  console.log('Type request:', req.method);

  handleRoutes(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
