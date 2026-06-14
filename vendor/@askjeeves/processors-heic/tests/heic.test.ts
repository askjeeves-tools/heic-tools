import { MAX_HEIC_FILE_BYTES } from "@askjeeves/conversion-core";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("heic2any", () => ({
	default: vi.fn(),
}));

vi.mock("@askjeeves/processors-images", () => ({
	convertImage: vi.fn(async () => ({
		blob: new Blob([new Uint8Array([1])], { type: "image/jpeg" }),
		filename: "out.jpg",
		mimeType: "image/jpeg",
	})),
}));

describe("processors-heic", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.stubGlobal("createImageBitmap", undefined);
	});

	it("rejects files over HEIC size limit", async () => {
		const { heicToJpeg } = await import("../src/index");
		const big = new File(
			[new Uint8Array(MAX_HEIC_FILE_BYTES + 1)],
			"huge.heic",
			{ type: "image/heic" },
		);

		await expect(heicToJpeg(big)).rejects.toThrow(/exceeds/i);
	});

	it("surfaces decode errors from heic2any", async () => {
		const heic2any = (await import("heic2any")).default as ReturnType<
			typeof vi.fn
		>;
		heic2any.mockRejectedValue(new Error("wasm decode failed"));

		const { heicToJpeg } = await import("../src/index");
		const file = new File([new Uint8Array([1, 2, 3])], "bad.heic", {
			type: "image/heic",
		});

		await expect(heicToJpeg(file)).rejects.toThrow(/Could not decode HEIC/i);
	});

	it("returns jpeg output when heic2any succeeds", async () => {
		const heic2any = (await import("heic2any")).default as ReturnType<
			typeof vi.fn
		>;
		heic2any.mockResolvedValue(
			new Blob([new Uint8Array([255, 216, 255])], { type: "image/jpeg" }),
		);

		const { heicToJpeg } = await import("../src/index");
		const file = new File([new Uint8Array([1, 2, 3])], "ok.heic", {
			type: "image/heic",
		});
		const result = await heicToJpeg(file);

		expect(result.mimeType).toBe("image/jpeg");
		expect(result.filename).toMatch(/\.jpg$/i);
	});
});
