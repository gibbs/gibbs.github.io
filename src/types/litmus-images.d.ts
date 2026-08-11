export type LitmusImages = {
	items: LitmusDistro[];
};

export type LitmusDistro = {
	image: string;
	name: string;
	items: LitmusImage[];
};

export type LitmusImage = {
	tag: string;
	dockerfile: string;
	platforms: string[];
	base_image: string;
	base_tag: string;
	eol: LitmusImageEol;
};

export type LitmusImageEol = {
	cycle: string;
	release_date: string;
	eol_from: string;
	is_eol: boolean;
	source: string;
};
