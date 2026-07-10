import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { O as createComponent, b as addAttribute, c as Fragment, m as renderTemplate, o as renderComponent, r as renderScript, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_hBMFtw2l.mjs";
import { n as siteConfig } from "./url_CGAqnK3O.mjs";
import { n as $$GlassPanel, r as $$Header, t as $$Footer } from "./Footer_Dn3ReZgh.mjs";
import { t as $$Container } from "./Container_DC2M1AfB.mjs";
import { n as getAllPosts } from "./db_DK9W4roq.mjs";
import { t as $$PostGrid } from "./PostGrid_BLkYh0I9.mjs";
import { t as $$Pagination } from "./Pagination_DPaPW-iC.mjs";
//#region src/pages/blog/index.astro
var blog_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	let allPosts = [];
	let featured = [];
	let pagePosts = [];
	function parseTags(tags) {
		if (!tags) return [];
		try {
			const parsed = JSON.parse(tags);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return String(tags).split(",").map((t) => t.trim()).filter(Boolean);
		}
	}
	function mapRowsToPosts(rows) {
		return rows.map((post) => ({
			id: post.id,
			title: post.title,
			excerpt: post.excerpt,
			slug: post.slug,
			cover_image: post.cover_image || void 0,
			published_at: post.published_at,
			read_time: post.read_time,
			is_featured: post.is_featured === 1,
			tags: parseTags(post.tags),
			content: post.content
		}));
	}
	function tagSlug(tag) {
		return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
	}
	function collectTagsFromPosts(posts) {
		const bySlug = /* @__PURE__ */ new Map();
		for (const post of posts) {
			const tags = Array.isArray(post.tags) ? post.tags : parseTags(post.tags);
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
	try {
		allPosts = mapRowsToPosts(await getAllPosts());
		featured = allPosts.filter((p) => p.is_featured).slice(0, 2);
		const perPage = siteConfig.blog.postsPerPage;
		pagePosts = allPosts.slice(0, perPage);
	} catch (error) {
		console.error("Error loading posts from database:", error);
	}
	const totalPages = Math.max(1, Math.ceil(allPosts.length / siteConfig.blog.postsPerPage));
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Blog",
		"description": "Panduan, tips, dan artikel seputar SeminarKit untuk acara seminar yang profesional.",
		"data-astro-cid-x255k2k2": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-x255k2k2": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" class="main-content" data-astro-cid-x255k2k2><section class="blog-hero" data-astro-cid-x255k2k2>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-x255k2k2": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "GlassPanel", $$GlassPanel, {
		"variant": "solid",
		"padding": "xl",
		"className": "hero-content",
		"data-astro-cid-x255k2k2": true
	}, { "default": ($$result) => renderTemplate`<div class="hero-copy" data-astro-cid-x255k2k2><p class="hero-kicker" data-astro-cid-x255k2k2>Blog SeminarKit</p><h1 class="hero-title" data-astro-cid-x255k2k2>Blog</h1><p class="hero-description" data-astro-cid-x255k2k2>Temukan panduan seminar, checklist acara, dan inspirasi logistik yang membantu tim Anda menyiapkan acara dengan lebih rapi.</p></div><div class="hero-meta" data-astro-cid-x255k2k2><span data-astro-cid-x255k2k2>Checklist</span><span data-astro-cid-x255k2k2>Logistik</span><span data-astro-cid-x255k2k2>Branding</span></div>` })}` })}</section>${featured.length > 0 && renderTemplate`<section class="section" data-astro-cid-x255k2k2>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-x255k2k2": true
	}, { "default": ($$result) => renderTemplate`<div class="section-heading" data-astro-cid-x255k2k2><h2 class="section-title" data-astro-cid-x255k2k2>Artikel unggulan</h2><p data-astro-cid-x255k2k2>Rekomendasi bacaan untuk mempersiapkan seminar dari awal sampai selesai.</p></div>${renderComponent($$result, "PostGrid", $$PostGrid, {
		"posts": featured,
		"columns": "two",
		"data-astro-cid-x255k2k2": true
	})}` })}</section>`}<section class="section" data-astro-cid-x255k2k2>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-x255k2k2": true
	}, { "default": ($$result) => renderTemplate`<div class="section-heading" data-astro-cid-x255k2k2><h2 class="section-title" data-astro-cid-x255k2k2>${featured.length > 0 ? "Artikel terbaru" : "Semua artikel"}</h2><p data-astro-cid-x255k2k2>Semua panduan dan insight SeminarKit dalam satu tempat.</p></div>${(() => {
		const tags = collectTagsFromPosts(allPosts);
		if (tags.length === 0) return null;
		return renderTemplate`<div class="tag-tabs" data-astro-cid-x255k2k2><button type="button" data-slug="all" class="tag-tab active" data-astro-cid-x255k2k2>Semua</button>${tags.map(({ tag, slug, count }) => renderTemplate`<button type="button"${addAttribute(slug, "data-slug")} class="tag-tab" data-astro-cid-x255k2k2>${tag} <span class="tag-count" data-astro-cid-x255k2k2>${count}</span></button>`)}</div>`;
	})()}${allPosts.length === 0 ? renderTemplate`${renderComponent($$result, "GlassPanel", $$GlassPanel, {
		"variant": "default",
		"padding": "xl",
		"className": "empty-state",
		"data-astro-cid-x255k2k2": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-x255k2k2>Belum ada artikel yang tersedia. Kunjungi kembali nanti.</p>` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PostGrid", $$PostGrid, {
		"posts": pagePosts,
		"data-astro-cid-x255k2k2": true
	})}${renderComponent($$result, "Pagination", $$Pagination, {
		"currentPage": 1,
		"totalPages": totalPages,
		"basePath": "/blog",
		"data-astro-cid-x255k2k2": true
	})}${renderScript($$result, "C:/ASTRO/template2/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts")}` })}`}` })}</section></main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-x255k2k2": true })}` })}`;
}, "C:/ASTRO/template2/src/pages/blog/index.astro", void 0);
var $$file = "C:/ASTRO/template2/src/pages/blog/index.astro";
var $$url = "/blog";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/index@_@astro
var page = () => blog_exports;
//#endregion
export { page };
