import { D as createAstro, O as createComponent, b as addAttribute, c as Fragment, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { n as siteConfig, t as withBase } from "./url_CGAqnK3O.mjs";
import { t as $$Tag } from "./Tag_CqDCpvm-.mjs";
import { t as $$Picture } from "./Picture_tDr0gp0x.mjs";
import { t as $$Badge } from "./Badge_EQ5LBhme.mjs";
//#region src/components/blog/BlogCard.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$BlogCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BlogCard;
	const { title, description, pubDate, heroImage, heroImageAlt, tags, href, readingTime, featured = false } = Astro.props;
	const safeTags = Array.isArray(tags) ? tags : [];
	function tagSlug(tag) {
		return String(tag).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
	}
	const parsedPubDate = pubDate instanceof Date ? pubDate : pubDate ? new Date(pubDate) : null;
	const hasValidDate = parsedPubDate instanceof Date && !Number.isNaN(parsedPubDate.valueOf());
	const formattedDate = hasValidDate ? parsedPubDate.toLocaleDateString("id-ID", {
		year: "numeric",
		month: "long",
		day: "numeric"
	}) : "Tanggal tidak tersedia";
	return renderTemplate`${maybeRenderHead($$result)}<article class="blog-card glass-card"${addAttribute(safeTags.map(tagSlug).join(" "), "data-tags")} data-astro-cid-hlaek5cb>${heroImage && renderTemplate`<a${addAttribute(href, "href")} class="blog-card__image-link" tabindex="-1" aria-hidden="true" data-astro-cid-hlaek5cb><div class="blog-card__image" data-astro-cid-hlaek5cb>${renderComponent($$result, "Picture", $$Picture, {
		"src": heroImage,
		"alt": heroImageAlt ?? title,
		"widths": [400, 800],
		"sizes": "(min-width: 900px) 400px, 100vw",
		"data-astro-cid-hlaek5cb": true
	})}${featured && renderTemplate`<span class="blog-card__featured" data-astro-cid-hlaek5cb>${renderComponent($$result, "Badge", $$Badge, {
		"variant": "accent",
		"data-astro-cid-hlaek5cb": true
	}, { "default": ($$result) => renderTemplate`Featured` })}</span>`}</div></a>`}<div class="blog-card__content" data-astro-cid-hlaek5cb><header class="blog-card__header" data-astro-cid-hlaek5cb><div class="blog-card__meta" data-astro-cid-hlaek5cb><time${addAttribute(hasValidDate ? parsedPubDate.toISOString() : void 0, "datetime")} data-astro-cid-hlaek5cb>${formattedDate}</time>${readingTime && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span class="separator" aria-hidden="true" data-astro-cid-hlaek5cb>·</span><span data-astro-cid-hlaek5cb>${readingTime} menit</span>` })}`}</div></header><h3 class="blog-card__title" data-astro-cid-hlaek5cb><a${addAttribute(href, "href")} data-astro-cid-hlaek5cb>${title}</a></h3><p class="blog-card__description" data-astro-cid-hlaek5cb>${description}</p>${safeTags.length > 0 && renderTemplate`<div class="blog-card__tags" data-astro-cid-hlaek5cb>${safeTags.slice(0, 3).map((tag) => renderTemplate`${renderComponent($$result, "Tag", $$Tag, {
		"name": tag,
		"size": "sm",
		"data-astro-cid-hlaek5cb": true
	})}`)}</div>`}<span class="blog-card__link" aria-hidden="true" data-astro-cid-hlaek5cb>Baca selengkapnya →</span></div></article>`;
}, "D:/Kuliah/Magang/template2/src/components/blog/BlogCard.astro", void 0);
//#endregion
//#region src/components/blog/PostGrid.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$PostGrid = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PostGrid;
	const { posts, columns = "auto" } = Astro.props;
	function normalizeTags(value) {
		if (Array.isArray(value)) return value.filter(Boolean).map(String);
		if (typeof value === "string") try {
			const parsed = JSON.parse(value);
			if (Array.isArray(parsed)) return parsed.filter(Boolean).map(String);
		} catch {
			return value.split(",").map((s) => s.trim()).filter(Boolean);
		}
		return [];
	}
	function normalizeDate(value) {
		if (!value) return null;
		const date = value instanceof Date ? value : new Date(value);
		return Number.isNaN(date.valueOf()) ? null : date;
	}
	const showReadingTime = siteConfig.blog.showReadingTime;
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`posts-grid posts-grid--${columns}`, "class")} data-astro-cid-274u2iem>${posts.map((post) => renderTemplate`${renderComponent($$result, "BlogCard", $$BlogCard, {
		"title": post.title,
		"description": post.excerpt,
		"pubDate": normalizeDate(post.published_at),
		"heroImage": post.cover_image,
		"heroImageAlt": post.title,
		"tags": normalizeTags(post.tags),
		"href": withBase(`/blog/${post.slug}`),
		"readingTime": showReadingTime ? post.read_time : void 0,
		"featured": post.is_featured,
		"data-astro-cid-274u2iem": true
	})}`)}</div>`;
}, "D:/Kuliah/Magang/template2/src/components/blog/PostGrid.astro", void 0);
//#endregion
export { $$PostGrid as t };
