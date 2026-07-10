import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as siteConfig, t as withBase } from "./url_CGAqnK3O.mjs";
import { s as getAllPosts } from "./db_CQnXq70y.mjs";
import rss from "@astrojs/rss";
//#region src/pages/rss.xml.ts
var rss_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
function parseTags(tags) {
	if (!tags) return [];
	try {
		const parsed = JSON.parse(tags);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return String(tags).split(",").map((t) => t.trim()).filter(Boolean);
	}
}
async function GET(context) {
	const rows = await getAllPosts();
	return rss({
		title: `${siteConfig.name} — Blog`,
		description: siteConfig.description,
		site: context.site ?? siteConfig.url,
		items: rows.map((post) => ({
			title: post.title,
			description: post.excerpt,
			pubDate: new Date(post.published_at),
			link: withBase(`/blog/${post.slug}/`),
			categories: parseTags(post.tags),
			author: post.author || void 0
		})),
		customData: `<language>en-us</language>`
	});
}
//#endregion
//#region \0virtual:astro:page:src/pages/rss.xml@_@ts
var page = () => rss_xml_exports;
//#endregion
export { page };
