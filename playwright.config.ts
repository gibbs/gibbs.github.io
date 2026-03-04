import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { loadEnv } from 'vite';

const env: Record<string, string> = loadEnv(process.env.NODE_ENV ?? 'testing', process.cwd(), '');

const config: PlaywrightTestConfig = {
	testDir: './tests/spec',
	timeout: 15 * 1000,
	expect: {
		timeout: 5000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? 'html' : 'list',
	use: {
		actionTimeout: 15 * 1000,
		baseURL: env.BASE_URL,
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},
		...(process.env.CI
			? [
					{
						name: 'firefox',
						use: {
							...devices['Desktop Firefox'],
						},
					},
				]
			: []),
	],
	webServer: {
		command: 'npm run preview:testing',
		port: parseInt(env.PORT || '4321'),
	},
};

export default config;
