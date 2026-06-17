export interface FaqEntry {
	question: string;
	answer: string;
}

export const FAQ_ENTRIES: FaqEntry[] = [
	{
		question: "Is this HEIC converter free?",
		answer:
			"Yes. Every conversion is free with no account, watermark, or usage limit.",
	},
	{
		question: "Is this HEIC converter secure?",
		answer:
			"Yes. Files are processed locally in your browser. Nothing is uploaded to a server, so your photos stay on your device.",
	},
	{
		question: "What formats can I convert HEIC to?",
		answer:
			"You can convert HEIC or HEIF files to JPEG, PNG, or PDF. JPEG and PNG support quality and max-width options.",
	},
	{
		question: "Does it work with iPhone photos?",
		answer:
			"Yes. HEIC is the default photo format on many iPhones. Upload a .heic or .heif file from your camera roll or Files app.",
	},
	{
		question: "Does the converter work on mobile?",
		answer:
			"Yes. It runs in modern mobile browsers that support HTML5 and JavaScript. Safari may use native HEIC decoding; other browsers use a WASM fallback.",
	},
	{
		question: "What is the maximum file size?",
		answer:
			"Each file can be up to about 50 MB. If a file is too large, you will see a clear error message asking you to use a smaller file.",
	},
	{
		question: "Why did my conversion fail?",
		answer:
			"Common causes are a non-HEIC file, corrupted image data, or exceeding the size limit. Check the message below the converter for specific guidance, then try again or refresh the page.",
	},
];
