import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { O as createComponent, b as addAttribute, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_hBMFtw2l.mjs";
import { t as withBase } from "./url_CGAqnK3O.mjs";
import { n as $$GlassPanel, r as $$Header, t as $$Footer } from "./Footer_Dn3ReZgh.mjs";
import { t as $$Container } from "./Container_DC2M1AfB.mjs";
import { n as getAllPosts } from "./db_DK9W4roq.mjs";
//#region src/pages/tags/index.astro
var tags_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	function parseTags(tags) {
		if (!tags) return [];
		if (Array.isArray(tags)) return tags.map((tag) => String(tag).trim()).filter(Boolean);
		const raw = String(tags).trim();
		if (!raw) return [];
		try {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) return parsed.map((tag) => String(tag).trim()).filter(Boolean);
			if (typeof parsed === "string") return [parsed.trim()].filter(Boolean);
		} catch {}
		const quotedMatches = raw.match(/['"]([^'"]+)['"]/g) || [];
		if (quotedMatches.length > 0) return quotedMatches.map((match) => match.replace(/^['"]|['"]$/g, "").trim()).filter(Boolean);
		return raw.split(/[,;]+/).map((t) => t.trim()).filter(Boolean);
	}
	function tagSlug(tag) {
		return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
	}
	function collectTagsFromPosts(posts) {
		const bySlug = /* @__PURE__ */ new Map();
		for (const post of posts) {
			const tags = parseTags(post.tags);
			const seen = /* @__PURE__ */ new Set();
			for (const raw of tags) {
				const slug = tagSlug(raw);
				if (!slug || seen.has(slug)) continue;
				seen.add(slug);
				const existing = bySlug.get(slug);
				if (existing) existing.count += 1;
				else bySlug.set(slug, {
					tag: raw,
					count: 1
				});
			}
		}
		return [...bySlug.entries()].map(([slug, { tag, count }]) => ({
			tag,
			slug,
			count
		})).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
	}
	let tags = [];
	try {
		tags = collectTagsFromPosts(await getAllPosts());
	} catch (error) {
		console.error("Error loading tags:", error);
	}
	const maxCount = tags.reduce((m, t) => Math.max(m, t.count), 1);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Tag",
		"description": "Jelajahi artikel SeminarKit berdasarkan topik dan jenis acara.",
		"data-astro-cid-wybof3wm": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-wybof3wm": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" class="main-content" data-astro-cid-wybof3wm><section class="section" data-astro-cid-wybof3wm>${renderComponent($$result, "Container", $$Container, {
		"size": "md",
		"data-astro-cid-wybof3wm": true
	}, { "default": ($$result) => renderTemplate`<header class="tags-header" data-astro-cid-wybof3wm><h1 class="tags-title" data-astro-cid-wybof3wm>Tag</h1><p class="tags-subtitle" data-astro-cid-wybof3wm>Temukan artikel berdasarkan topik seminar dan acara.</p></header>${tags.length === 0 ? renderTemplate`${renderComponent($$result, "GlassPanel", $$GlassPanel, {
		"variant": "default",
		"padding": "xl",
		"className": "empty",
		"data-astro-cid-wybof3wm": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-wybof3wm>Belum ada tag saat ini.</p>` })}` : renderTemplate`${renderComponent($$result, "GlassPanel", $$GlassPanel, {
		"variant": "solid",
		"padding": "xl",
		"data-astro-cid-wybof3wm": true
	}, { "default": ($$result) => renderTemplate`<ul class="tag-cloud" data-astro-cid-wybof3wm>${tags.map(({ tag, slug, count }) => renderTemplate`<li data-astro-cid-wybof3wm><a class="tag-cloud__item"${addAttribute(withBase(`/tags/${slug}`), "href")}${addAttribute(`--weight: ${.85 + count / maxCount * .6}`, "style")} data-astro-cid-wybof3wm><span class="tag-cloud__hash" data-astro-cid-wybof3wm>#</span>${tag}<span class="tag-cloud__count" data-astro-cid-wybof3wm>${count}</span></a></li>`)}</ul>` })}`}` })}</section></main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-wybof3wm": true })}` })}`;
}, "C:/ASTRO/template2/src/pages/tags/index.astro", void 0);
var $$file = "C:/ASTRO/template2/src/pages/tags/index.astro";
var $$url = "/tags";
//#endregion
//#region \0virtual:astro:page:src/pages/tags/index@_@astro
var page = () => tags_exports;
//#endregion
export { page };
