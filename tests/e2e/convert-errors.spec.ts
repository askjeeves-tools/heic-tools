import { unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fixturePath } from "@askjeeves/test-e2e/fixtures";
import {
	expectConvertPanelVisible,
	expectToolStatusError,
} from "@askjeeves/test-e2e/tool-flow";
import { test } from "@playwright/test";

test("wrong format upload shows error", async ({ page }) => {
	await page.goto("/");

	const badPath = join(fixturePath(".."), "fake-upload.pdf");

	await writeFile(badPath, "not a real pdf");

	try {
		await page.locator("#tool-file-input").setInputFiles(badPath);

		await expectToolStatusError(page, /HEIC|unsupported|accept/i);

		await expectConvertPanelVisible(page, false);
	} finally {
		await unlink(badPath).catch(() => {});
	}
});

test("oversize upload shows error", async ({ page }) => {
	const bigPath = join(fixturePath(".."), "oversize.heic");

	const big = Buffer.alloc(26_214_401, 0x00);

	const header = Buffer.from([0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70]);

	header.copy(big, 4);

	try {
		await writeFile(bigPath, big);

		await page.goto("/");

		await page.locator("#tool-file-input").setInputFiles(bigPath);

		await expectToolStatusError(page, /too large/i);
	} finally {
		await unlink(bigPath).catch(() => {});
	}
});
