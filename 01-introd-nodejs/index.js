import http from 'node:http';

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === '/' && method === 'GET') {
    return res.end(
      JSON.stringify({
        status: 200,
        body: 'Welcome to home my friend\n',
      }),
    );
  } else if (url === '/' && method === 'POST') {
    return res.end(
      JSON.stringify({
        status: res.statusCode,
        body: '404 (Not found)\n',
      }),
    );
  }
});
server.listen(3000, () => {
  console.log('Servidor operant');
});
