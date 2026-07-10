import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { D as createAstro, O as createComponent, T as unescapeHTML, b as addAttribute, c as Fragment, m as renderTemplate, o as renderComponent, r as renderScript, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_hBMFtw2l.mjs";
import { n as siteConfig, t as withBase } from "./url_CGAqnK3O.mjs";
import { n as $$GlassPanel, r as $$Header, t as $$Footer } from "./Footer_Dn3ReZgh.mjs";
import { t as $$GlassCard } from "./GlassCard_BGeSJzan.mjs";
import { d as getPostBySlug, u as getPost } from "./db_CQnXq70y.mjs";
import { t as $$Tag } from "./Tag_DK1SaJVi.mjs";
import { t as $$Picture } from "./Picture_Bqotq_aC.mjs";
import MarkdownIt from "markdown-it";
//#region src/pages/blog/[...slug].astro
var ____slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Component,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://your-vercel-domain.vercel.app");
var $$Component = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Component;
	const rawSlug = Astro.params.slug;
	const slug = Array.isArray(rawSlug) ? rawSlug.join("/") : rawSlug;
	let post = null;
	try {
		if (!slug) return Astro.redirect("/blog");
		const maybeId = Number(slug);
		if (!Number.isNaN(maybeId) && String(maybeId) === slug) post = await getPost(maybeId);
		if (!post) post = await getPostBySlug(slug);
		if (!post) return Astro.redirect("/blog");
	} catch (error) {
		console.error("Error loading post:", error);
		return Astro.redirect("/blog");
	}
	const wordCount = String(post?.content ?? "").split(/\s+/).filter(Boolean).length;
	const readingTime = Math.ceil(wordCount / 200);
	const dateOpts = {
		year: "numeric",
		month: "long",
		day: "numeric"
	};
	const pubDate = new Date(post.published_at);
	const formattedDate = pubDate.toLocaleDateString("en-US", dateOpts);
	let tags = [];
	if (post.tags) try {
		tags = JSON.parse(post.tags);
	} catch {
		tags = post.tags.split(",").map((t) => t.trim()).filter(Boolean);
	}
	function slugify(text) {
		return String(text).toLowerCase().trim().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
	}
	let contentHtml = post.content || "";
	try {
		contentHtml = new MarkdownIt({
			html: true,
			linkify: true
		}).render(String(post.content || ""));
	} catch (e) {
		contentHtml = String(post.content || "");
	}
	const toc = [];
	contentHtml = contentHtml.replace(/<(h2|h3)([^>]*)>(.*?)<\/\1>/gi, (_m, tag, attrs, inner) => {
		const id = slugify(inner);
		toc.push({
			id,
			text: inner.replace(/<[^>]+>/g, "")
		});
		return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
	});
	const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(Astro.url.href)}`;
	const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(Astro.url.href)}`;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": post.title,
		"description": post.excerpt,
		"ogImage": post.cover_image,
		"article": {
			publishedTime: pubDate.toISOString(),
			author: "",
			tags
		},
		"data-astro-cid-jo55ryrt": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-jo55ryrt": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" class="main-content" data-astro-cid-jo55ryrt><article class="blog-post" data-astro-cid-jo55ryrt><div class="container" data-astro-cid-jo55ryrt>${renderComponent($$result, "GlassPanel", $$GlassPanel, {
		"variant": "solid",
		"padding": "xl",
		"className": "post-header",
		"data-astro-cid-jo55ryrt": true
	}, { "default": ($$result) => renderTemplate`<a${addAttribute(withBase("/blog"), "href")} class="post-back" data-astro-cid-jo55ryrt>← Kembali ke blog</a><h1 class="post-title" data-astro-cid-jo55ryrt>${post.title}</h1><div class="post-meta" data-astro-cid-jo55ryrt><time${addAttribute(pubDate.toISOString(), "datetime")} data-astro-cid-jo55ryrt>${formattedDate}</time>${siteConfig.blog.showReadingTime && readingTime > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span class="separator" aria-hidden="true" data-astro-cid-jo55ryrt>·</span><span data-astro-cid-jo55ryrt>${readingTime} min read</span>` })}`}</div>${tags.length > 0 && renderTemplate`<div class="post-tags" data-astro-cid-jo55ryrt>${tags.map((tag) => renderTemplate`${renderComponent($$result, "Tag", $$Tag, {
		"name": tag,
		"data-astro-cid-jo55ryrt": true
	})}`)}</div>`}` })}${post.cover_image && renderTemplate`<div class="post-hero" data-astro-cid-jo55ryrt>${renderComponent($$result, "Picture", $$Picture, {
		"src": post.cover_image,
		"alt": post.title || "Gambar artikel",
		"width": 1200,
		"height": 600,
		"sizes": "100vw",
		"loading": "eager",
		"class": "post-hero__img",
		"data-astro-cid-jo55ryrt": true
	})}</div>`}${!post.cover_image && renderTemplate`<div class="post-hero" data-astro-cid-jo55ryrt>${renderComponent($$result, "Picture", $$Picture, {
		"src": "/src/assets/images/product/paket-terorganisir.webp",
		"alt": post.title || "Gambar artikel",
		"width": 1200,
		"height": 600,
		"sizes": "100vw",
		"loading": "eager",
		"class": "post-hero__img",
		"data-astro-cid-jo55ryrt": true
	})}</div>`}<div class="post-content" data-astro-cid-jo55ryrt><div class="content-wrapper" data-astro-cid-jo55ryrt><div class="prose" data-astro-cid-jo55ryrt>${unescapeHTML(contentHtml)}</div><div class="post-share" data-astro-cid-jo55ryrt>${renderComponent($$result, "GlassCard", $$GlassCard, { "data-astro-cid-jo55ryrt": true }, { "default": ($$result) => renderTemplate`<h3 class="sidebar-title" data-astro-cid-jo55ryrt>Bagikan artikel ini</h3><div class="social-links" data-astro-cid-jo55ryrt><a${addAttribute(tweetUrl, "href")} target="_blank" rel="noopener noreferrer" class="social-link" data-astro-cid-jo55ryrt>Bagikan ke X</a><a${addAttribute(linkedInUrl, "href")} target="_blank" rel="noopener noreferrer" class="social-link" data-astro-cid-jo55ryrt>Bagikan ke LinkedIn</a></div>` })}</div></div><aside class="post-sidebar" data-astro-cid-jo55ryrt>${renderComponent($$result, "GlassCard", $$GlassCard, { "data-astro-cid-jo55ryrt": true }, { "default": ($$result) => renderTemplate`<h3 class="sidebar-title" data-astro-cid-jo55ryrt>Di halaman ini</h3>${toc.length === 0 ? renderTemplate`<p class="sidebar-empty" data-astro-cid-jo55ryrt>Tidak ada heading</p>` : renderTemplate`<ul class="toc-list" data-astro-cid-jo55ryrt>${toc.map((t) => renderTemplate`<li data-astro-cid-jo55ryrt><a${addAttribute("#" + t.id, "href")} data-astro-cid-jo55ryrt>${t.text}</a></li>`)}</ul>`}` })}</aside></div></div></article></main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-jo55ryrt": true })}` })}${renderScript($$result, "C:/ASTRO/template2/src/pages/blog/[...slug].astro?astro&type=script&index=0&lang.ts")}
                ))`;
}, "C:/ASTRO/template2/src/pages/blog/[...slug].astro", void 0);
var $$file = "C:/ASTRO/template2/src/pages/blog/[...slug].astro";
var $$url = "/blog/[...slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/[...slug]@_@astro
var page = () => ____slug__exports;
//#endregion
export { page };
