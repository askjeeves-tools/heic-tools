import { createToolConfig } from "@askjeeves/conversion-core";

export const toolConfig = createToolConfig({
	id: "heic-tools",
	title: "HEIC Converter",
	tagline: "Convert HEIC files in your browser. Nothing leaves your device.",
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
