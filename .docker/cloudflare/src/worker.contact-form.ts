export default {
	async fetch(request, env) {
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', { status: 405 });
		}

		try {
			const payload = await request.json();
			const { name, subject, email, message } = payload;

			if (subject && subject.trim() !== '') {
				return new Response(JSON.stringify({ success: true, message: 'Spam detected' }), {
					status: 200,
					headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
				});
			}

			const mailgunFormData = new FormData();
			mailgunFormData.append(
				'from',
				`Contact Form <mailgun@${env.CLOUDFLARE_WORKER_MAILGUN_DOMAIN}>`,
			);
			mailgunFormData.append('to', env.CLOUDFLARE_WORKER_NOTIFICATION_EMAIL);
			mailgunFormData.append('subject', `New Form Submission from ${name}`);
			mailgunFormData.append('text', `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

			const authHeader = 'Basic ' + btoa(`api:${env.MAILGUN_API_KEY}`);

			const mailgunResponse = await fetch(
				`https://api.eu.mailgun.net/v3/${env.CLOUDFLARE_WORKER_MAILGUN_DOMAIN}/messages`,
				{
					method: 'POST',
					headers: {
						Authorization: authHeader,
					},
					body: mailgunFormData,
				},
			);

			if (!mailgunResponse.ok) {
				throw new Error('Mailgun API error');
			}

			return new Response(JSON.stringify({ success: true }), {
				status: 200,
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			});
		} catch (error) {
			return new Response(JSON.stringify({ success: false, error: error.message }), {
				status: 500,
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			});
		}
	},
};
