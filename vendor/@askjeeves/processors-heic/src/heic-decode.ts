import type { UserFacingError } from "@askjeeves/conversion-core";
import {
	canvasToBlob,
	formatBytes,
	MAX_HEIC_FILE_BYTES,
	userFacingError,
} from "@askjeeves/conversion-core";

export type HeicOutputMime = "image/jpeg" | "image/png";

function assertHeicSize(file: File): void {
	if (file.size > MAX_HEIC_FILE_BYTES) {
		throw userFacingError(
			`HEIC file exceeds ${formatBytes(MAX_HEIC_FILE_BYTES)} limit.`,
		);
	}
}

function heicDecodeError(cause: unknown): UserFacingError {
	const detail =
		cause instanceof Error && cause.message ? cause.message : "decode failed";
	return userFacingError(
		`Could not decode HEIC (${detail}). Try Safari on Apple devices or a different file.`,
	);
}

async function decodeHeicNative(
	file: File,
	mimeType: HeicOutputMime,
): Promise<Blob | null> {
	if (typeof createImageBitmap !== "function") return null;

	try {
		const bitmap = await createImageBitmap(file);
		const canvas = document.createElement("canvas");
		canvas.width = bitmap.width;
		canvas.height = bitmap.height;
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			bitmap.close();
			return null;
		}
		ctx.drawImage(bitmap, 0, 0);
		bitmap.close();
		return canvasToBlob(
			canvas,
			mimeType,
			mimeType === "image/jpeg" ? 0.92 : undefined,
		);
	} catch {
		return null;
	}
}

async function decodeHeicWasm(
	file: File,
	toType: HeicOutputMime,
): Promise<Blob> {
	const heic2any = (await import("heic2any")).default;
	let result: Blob | Blob[];
	try {
		result = await heic2any({
			blob: file,
			toType,
			quality: 0.92,
		});
	} catch (err) {
		throw heicDecodeError(err);
	}
	const blob = Array.isArray(result) ? result[0] : result;
	if (!blob) {
		throw userFacingError("HEIC decode produced no output.");
	}
	return blob;
}

export async function decodeHeic(
	file: File,
	toType: HeicOutputMime = "image/jpeg",
): Promise<Blob> {
	assertHeicSize(file);

	const native = await decodeHeicNative(file, toType);
	if (native) return native;

	return decodeHeicWasm(file, toType);
}

async function dimensionsFromBlob(
	blob: Blob,
): Promise<{ width: number; height: number }> {
	if (typeof createImageBitmap === "function") {
		const bitmap = await createImageBitmap(blob);
		const dims = { width: bitmap.width, height: bitmap.height };
		bitmap.close();
		return dims;
	}

	return new Promise((resolve, reject) => {
		const url = URL.createObjectURL(blob);
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(url);
			resolve({ width: img.naturalWidth, height: img.naturalHeight });
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(new Error("Could not load decoded HEIC image."));
		};
		img.src = url;
	});
}

export async function heicImageDimensions(
	file: File,
): Promise<{ width: number; height: number; jpegBytes: Uint8Array }> {
	const decoded = await decodeHeic(file, "image/jpeg");
	const jpegBytes = new Uint8Array(await decoded.arrayBuffer());
	const { width, height } = await dimensionsFromBlob(decoded);
	return { width, height, jpegBytes };
}
