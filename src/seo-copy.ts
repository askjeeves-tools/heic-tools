export const HOW_IT_WORKS_STEPS = [
	"Upload a HEIC or HEIF file using the drop zone or file picker.",
	"Choose an output format (JPEG, PNG, or PDF) and adjust image options if needed.",
	"Click Convert, then download your result. Nothing is uploaded to a server.",
] as const;

export const SECURITY_SECTION_COPY =
	"Your photos are processed locally in your browser. Nothing is stored on a server and nothing is uploaded over the network. That makes this tool a good fit for iPhone photos, personal images, and other sensitive files you do not want to send to a third-party service.";

export const CONVERSION_DESCRIPTIONS: Record<string, string> = {
	"heic-jpeg":
		"Convert HEIC to JPEG with adjustable quality and optional max width—ideal for sharing and compatibility.",
	"heic-png":
		"Convert HEIC to PNG with quality control and optional max width—lossless-friendly output.",
	"heic-pdf":
		"Turn a HEIC image into a single-page PDF document for printing or archiving.",
};
