import lang_enGB from '@data/en-gb.i18n';

export const languages = {
	'en-GB': 'English',
};

export const defaultLang = 'en-GB';

export const ui = {
	'en-GB': flattenLang(lang_enGB),
} as const;

/**
 * Flatten language strings to dot notation
 */
function flattenLang(obj: any, prefix = ''): Record<string, any> {
	return Object.keys(obj).reduce(
		(acc, key) => {
			const pre = prefix.length ? prefix + '.' : '';
			const value = obj[key];

			if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
				Object.assign(acc, flattenLang(value, pre + key));
			} else if (Array.isArray(value)) {
				value.forEach((val, index) => {
					if (typeof val === 'object' && val !== null) {
						Object.assign(acc, flattenLang(val, `${pre}${key}.${index}`));
					} else {
						acc[`${pre}${key}.${index}`] = val;
					}
				});
			} else {
				acc[pre + key] = value;
			}

			return acc;
		},
		{} as Record<string, any>,
	);
}
