import askJeeves from "@askjeeves/astro-integration";
import { defineConfig } from "astro/config";
import pkg from "./package.json" with { type: "json" };

export default defineConfig({
	output: "static",
	site: "https://heic.askjeeves.cc",
	integrations: [
		askJeeves({
			name: "Ask Jeeves",
			tagline:
				"Convert HEIC files in your browser. Nothing leaves your device.",
			version: pkg.version,
			openGraph: {
				home: {
					title: "HEIC Converter — Ask Jeeves",
					description:
						"Free HEIC to JPEG, PNG, and PDF conversion in your browser.",
				},
			},
		}),
	],
	vite: {
		resolve: { preserveSymlinks: true },
		ssr: {
			noExternal: [
				"@askjeeves/conversion-core",
				"@askjeeves/processors-heic",
				"@askjeeves/processors-images",
				"@askjeeves/ui",
			],
		},
	},
});
