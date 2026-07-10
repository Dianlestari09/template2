import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as siteConfig, t as withBase } from "./url_CGAqnK3O.mjs";
//#region src/pages/manifest.webmanifest.ts
var manifest_webmanifest_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = () => {
	const manifest = {
		name: siteConfig.name,
		short_name: siteConfig.name,
		description: siteConfig.description,
		start_url: withBase("/"),
		scope: withBase("/"),
		display: "standalone",
		theme_color: "#0b0f19",
		background_color: "#0b0f19",
		icons: [
			{
				src: withBase("/icon-192.png"),
				sizes: "192x192",
				type: "image/png"
			},
			{
				src: withBase("/icon-512.png"),
				sizes: "512x512",
				type: "image/png"
			},
			{
				src: withBase("/icon-512.png"),
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable"
			}
		]
	};
	return new Response(JSON.stringify(manifest, null, 2), { headers: { "Content-Type": "application/manifest+json" } });
};
//#endregion
//#region \0virtual:astro:page:src/pages/manifest.webmanifest@_@ts
var page = () => manifest_webmanifest_exports;
//#endregion
export { page };
