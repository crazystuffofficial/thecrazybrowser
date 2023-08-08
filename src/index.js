import createBareServer from '@tomphttp/bare-server-node';
import http from 'node:http';
import nodeStatic from 'node-static';


const PORT = process.env.PORT || 8080;


const bare = createBareServer('/bare/')
const server = http.createServer();
const serve = new nodeStatic.Server('static/');

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
		bare.routeRequest(req, res);
	} else {
		serve.serve(req, res);
	}
});

server.on('upgrade', (req, socket, head) => {
	if (bare.shouldRoute(req, socket, head)) {
		bare.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

server.on('listening', () => {
	console.log(`Bare server started on port ${PORT}`)
});

server.listen({ port: PORT });
