import { heicToJpeg, heicToPdf, heicToPng } from "@askjeeves/processors-heic";
import type { ProcessorMap } from "@askjeeves/ui/scripts/tool-controller";

export const processors: ProcessorMap = {
	"heic-jpeg": heicToJpeg,
	"heic-png": heicToPng,
	"heic-pdf": heicToPdf,
};
