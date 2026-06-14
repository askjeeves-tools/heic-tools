import type {
	ConversionOptions,
	ConversionResult,
	ProcessorContext,
} from "@askjeeves/conversion-core";
import {
	basename,
	throwIfAborted,
	withConversionError,
} from "@askjeeves/conversion-core";
import { convertImage } from "@askjeeves/processors-images";
import { decodeHeic, heicImageDimensions } from "./heic-decode";

function decodedAsFile(blob: Blob, sourceName: string, ext: string): File {
	return new File([blob], `${basename(sourceName)}.${ext}`, {
		type: blob.type,
	});
}

export async function heicToJpeg(
	file: File,
	options?: ConversionOptions,
	context?: ProcessorContext,
): Promise<ConversionResult> {
	return withConversionError("heic", async () => {
		throwIfAborted(context?.signal);
		const decoded = await decodeHeic(file, "image/jpeg");
		throwIfAborted(context?.signal);
		const asFile = decodedAsFile(decoded, file.name, "jpg");
		return convertImage(asFile, "jpeg", options, context);
	});
}

export async function heicToPng(
	file: File,
	options?: ConversionOptions,
	context?: ProcessorContext,
): Promise<ConversionResult> {
	return withConversionError("heic", async () => {
		throwIfAborted(context?.signal);
		const decoded = await decodeHeic(file, "image/png");
		throwIfAborted(context?.signal);
		const asFile = decodedAsFile(decoded, file.name, "png");
		return convertImage(asFile, "png", options, context);
	});
}

export async function heicToPdf(
	file: File,
	_options?: ConversionOptions,
	_context?: ProcessorContext,
): Promise<ConversionResult> {
	return withConversionError("heic", async () => {
		throwIfAborted(_context?.signal);
		const { PDFDocument } = await import("pdf-lib");
		const { width, height, jpegBytes } = await heicImageDimensions(file);
		const pdf = await PDFDocument.create();
		const image = await pdf.embedJpg(jpegBytes);
		const page = pdf.addPage([width, height]);
		page.drawImage(image, { x: 0, y: 0, width, height });

		const pdfBytes = await pdf.save();
		return {
			blob: new Blob([pdfBytes], { type: "application/pdf" }),
			filename: `${basename(file.name)}.pdf`,
			mimeType: "application/pdf",
		};
	});
}
