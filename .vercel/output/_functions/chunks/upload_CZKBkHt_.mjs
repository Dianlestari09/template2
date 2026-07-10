import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import path from "path";
import fs, { promises } from "fs";
//#region src/pages/api/upload.ts
var upload_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
async function ensureUploadsDir() {
	const uploadsDir = path.join(process.cwd(), "public", "uploads");
	if (!fs.existsSync(uploadsDir)) await promises.mkdir(uploadsDir, { recursive: true });
	return uploadsDir;
}
var POST = async ({ request }) => {
	try {
		const contentType = request.headers.get("content-type");
		console.log("[UPLOAD] Content-Type:", contentType);
		const file = (await request.formData()).get("file");
		if (!file || !(file instanceof File)) {
			console.log("[UPLOAD] No file found in formData or unsupported form value");
			return new Response(JSON.stringify({ error: "Tidak ada file yang diunggah atau format file tidak didukung" }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
		const imageFile = file;
		console.log("[UPLOAD] File object:", imageFile.name, imageFile.type, imageFile.size);
		const acceptedExtensions = [
			"jpg",
			"jpeg",
			"png",
			"webp",
			"gif",
			"avif"
		];
		const fileExtension = imageFile.name.split(".").pop()?.toLowerCase() ?? "";
		const isImageType = imageFile.type.startsWith("image/");
		const isImageExtension = acceptedExtensions.includes(fileExtension);
		if (!isImageType && !isImageExtension) return new Response(JSON.stringify({ error: "File harus berupa gambar (JPG, PNG, WebP, GIF, AVIF)" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (file.size > 5 * 1024 * 1024) return new Response(JSON.stringify({ error: "Ukuran file maksimal 5MB" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const uploadsDir = await ensureUploadsDir();
		const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${file.name.replace(/[^a-z0-9.-]/gi, "_").toLowerCase()}`;
		const filepath = path.join(uploadsDir, filename);
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		await promises.writeFile(filepath, buffer);
		const relativePath = `/uploads/${filename}`;
		return new Response(JSON.stringify({ url: relativePath }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Upload error:", error);
		return new Response(JSON.stringify({ error: "Gagal mengunggah gambar: " + error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/upload@_@ts
var page = () => upload_exports;
//#endregion
export { page };
