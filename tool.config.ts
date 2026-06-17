import { createToolConfig } from "@askjeeves/conversion-core";
import { SEO_BRAND_TITLE, SEO_DESCRIPTION } from "./src/seo";

export const toolConfig = createToolConfig({
	id: "heic-tools",
	title: SEO_BRAND_TITLE,
	tagline: SEO_DESCRIPTION,
	sourceFormat: "heic",
	allowsMultiple: false,
	minFiles: 1,
	conversions: [
		{
			id: "heic-jpeg",
			source: "heic",
			target: "jpeg",
			label: "HEIC → JPEG",
			enabled: true,
			options: "image",
		},
		{
			id: "heic-png",
			source: "heic",
			target: "png",
			label: "HEIC → PNG",
			enabled: true,
			options: "image",
		},
		{
			id: "heic-pdf",
			source: "heic",
			target: "pdf",
			label: "HEIC → PDF",
			enabled: true,
			options: "none",
		},
	],
});
