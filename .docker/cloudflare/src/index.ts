import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('/api/*', async (c, next) => {
	const corsMiddleware = cors({
		origin: c.env.CLOUDFLARE_WORKER_PROXY_API_REQUEST_ORIGIN,
	});

	return corsMiddleware(c, next);
});

app.all('/api/*', async (c) => {
	const url = new URL(c.req.url);
	const targetPath = url.pathname.replace('/api', '').replace(/^\//, '');
	const targetUrl = `${c.env.CLOUDFLARE_WORKER_PROXY_API_URL}${targetPath}${url.search}`;
	const response = await fetch(targetUrl, {
		method: c.req.method,
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization: `Bearer ${c.env.CLOUDFLARE_WORKER_PROXY_API_BEARER_TOKEN}`,
		},
		body: c.req.method !== 'GET' && c.req.method !== 'HEAD' ? await c.req.blob() : undefined,
	});

	return c.body(response.body, response.status, response.headers);
});

export default app;
