import * as Sentry from '@sentry/astro';

Sentry.init({
	dsn: 'https://ec20d6c9cec161c60f8ae948dac14b6d@o4511127957929984.ingest.us.sentry.io/4511127961796608',
	sendDefaultPii: true,
	integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
	enableLogs: true,
	tracesSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});
