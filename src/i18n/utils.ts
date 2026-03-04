import { ui, defaultLang } from '@i18n/ui';

/**
 * Get language from URL
 *
 * @param url URL
 * @returns string
 */
export function getLangFromUrl(url?: URL) {
	const [, lang] = url?.pathname.split('/') || defaultLang;

	if (lang in ui) return lang as keyof typeof ui;

	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(
		key: keyof (typeof ui)[typeof defaultLang],
		...params: Array<string | number | boolean | ((...args: any[]) => string | number)>
	) {
		const template = ui[lang][key] || ui[defaultLang][key] || '';

		return template.replace(/\$(\d+)/g, (_m, idx) => {
			const val = params[Number(idx) - 1];

			if (typeof val === 'function') return String(val());

			if (val === undefined || val === null) return '';

			return String(val);
		});
	};
}

/**
 * i18n translation helper
 *
 * @todo - set non-default lang if another language is ever used (unlikely)
 *
 * @param key string
 * @param args mixed
 * @returns string
 */
export function __(key: string, ...args: any[]): string {
	const t = useTranslations(defaultLang);

	return t(key, ...args);
}
