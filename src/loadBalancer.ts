import 'dotenv/config';
import http from 'http';
import cluster from 'cluster';
import { availableParallelism } from 'os';
import { handleRoutes } from './routes/routes';
import { users } from './data/users';

const PORT = process.env.PORT || 4000;

const numCPUs = availableParallelism();

let nextWorkerIndex = 0;

let initialData = [...users];

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    );
    console.log('Starting a new worker');

    cluster.fork();
  });

  cluster.on('message', (_worker, message) => {
    if (message.type === 'updateUsers') {
      initialData = [...message.users];
    }
  });

  const balancerServer = http.createServer((req, res) => {
    const { method, url, headers } = req;
    const body: Uint8Array[] = [];

    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        const requestData = Buffer.concat(body).toString();

        const requestToWorker = http.request(
          {
            hostname: 'localhost',
            port: Number(PORT) + nextWorkerIndex,
            method: method,
            headers: headers,
            path: url,
          },
          (workerResponse) => {
            workerResponse.pipe(res);
          }
        );

        requestToWorker.on('error', () => {
          res.writeHead(500);
          res.end('Error when forwarding request to worker');
        });

        requestToWorker.end(requestData);
      });
    nextWorkerIndex = (nextWorkerIndex + 1) % numCPUs;
  });

  balancerServer.listen(PORT, () => {
    console.log(`Load balancer is running on port ${PORT}`);
  });
} else {
  const currentPort = Number(PORT) + Number(cluster.worker?.id || 0);

  const server = http.createServer((req, res) => {
    const description = [
      {
        'Url:': req.url,
        'Type request:': req.method,
        'Port:': currentPort,
      },
    ];
    console.table(description);

    handleRoutes(req, res, initialData);
  });

  server.listen(currentPort, () => {
    console.log(`---Worker ${process.pid} is running on port ${currentPort}`);
  });
}
