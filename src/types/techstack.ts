import { __ } from '@i18n/utils';

export interface TechStack {
	heading: string;
	description: string;
	items: TechStackItem[];
}

export interface TechStackItem {
	title: string;
	icon?: string;
}

export const STACK: Record<string, TechStack> = {} as const;

export type TechStackMap = typeof STACK;
