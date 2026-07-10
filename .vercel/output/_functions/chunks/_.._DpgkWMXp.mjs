import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { D as createAstro, O as createComponent, T as unescapeHTML, b as addAttribute, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_hBMFtw2l.mjs";
import { n as siteConfig, t as withBase } from "./url_CGAqnK3O.mjs";
import { r as $$Header, t as $$Footer } from "./Footer_Dn3ReZgh.mjs";
import { t as $$Container } from "./Container_DC2M1AfB.mjs";
import { t as $$Button } from "./Button_BxPVawMq.mjs";
import { t as $$GlassCard } from "./GlassCard_BGeSJzan.mjs";
import { m as getProjectBySlug } from "./db_D5UdyGFH.mjs";
import { t as $$Picture } from "./Picture_Bqotq_aC.mjs";
//#region src/components/portfolio/ProjectGallery.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$ProjectGallery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProjectGallery;
	const { images, title } = Astro.props;
	const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
	return renderTemplate`${safeImages.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="gallery" aria-labelledby="gallery-title" data-astro-cid-yy55xgkg><div class="gallery__heading" data-astro-cid-yy55xgkg><p class="gallery__eyebrow" data-astro-cid-yy55xgkg>Visual record</p><h2 id="gallery-title" data-astro-cid-yy55xgkg>Inside the work</h2></div><div class="gallery__grid" data-astro-cid-yy55xgkg>${safeImages.map((src, index) => renderTemplate`<figure${addAttribute(["gallery__item", { "gallery__item--wide": index % 3 === 0 }], "class:list")} data-astro-cid-yy55xgkg>${renderComponent($$result, "Picture", $$Picture, {
		"src": src,
		"alt": `${title} project view ${index + 1}`,
		"widths": [
			400,
			800,
			1200
		],
		"sizes": index % 3 === 0 ? "100vw" : "(min-width: 720px) 50vw, 100vw",
		"class": "gallery__image",
		"data-astro-cid-yy55xgkg": true
	})}<figcaption data-astro-cid-yy55xgkg>${String(index + 1).padStart(2, "0")} / ${title}</figcaption></figure>`)}</div></section>`}`;
}, "C:/ASTRO/template2/src/components/portfolio/ProjectGallery.astro", void 0);
//#endregion
//#region src/pages/work/[...slug].astro
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
	const slug = Array.isArray(Astro.params.slug) ? Astro.params.slug.join("/") : Astro.params.slug;
	const project = await getProjectBySlug(String(slug || "")) || {};
	function parseJson(value, fallback) {
		if (value === void 0 || value === null) return fallback;
		if (typeof value === "string") try {
			return JSON.parse(value);
		} catch {
			return fallback;
		}
		return value;
	}
	function renderMarkdown(md) {
		if (!md) return "";
		if (/<[^>]+>/m.test(md)) return md;
		var html = md;
		html = html.replace(/```([\s\S]*?)```/g, function(_m, code) {
			return "<pre><code>" + escapeHtml(code) + "</code></pre>";
		});
		html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
		html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
		html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
		html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
		html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
		html = html.replace(/`([^`]+)`/gim, "<code>$1</code>");
		html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, "<a href=\"$2\" target=\"_blank\" rel=\"noopener noreferrer\">$1</a>");
		html = html.split(/\n\n+/).map(function(p) {
			return "<p>" + p.replace(/\n/g, "<br/>") + "</p>";
		}).join("\n");
		return html;
	}
	function escapeHtml(str) {
		return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	const contentHtml = renderMarkdown(project.content || project.description || "");
	const hasDetailedContent = Boolean(String(project.content || "").trim());
	const hasLeadText = Boolean(String(project.description || "").trim()) && !hasDetailedContent;
	const tech = typeof project.tech === "string" ? parseJson(project.tech, []) : project.tech || [];
	function normalizeImages(value) {
		if (!value) return [];
		if (Array.isArray(value)) return value.filter(Boolean);
		if (typeof value === "string") {
			const parsed = parseJson(value, []);
			if (Array.isArray(parsed)) return parsed.filter(Boolean);
			if (parsed) return [parsed];
			return [];
		}
		if (typeof value === "object") return [value];
		return [value];
	}
	const images = normalizeImages(project.images || project.gallery_images || project.gallery || []);
	const links = typeof project.links === "string" ? parseJson(project.links, {}) : project.links || {};
	const description = project.description ?? project.summary;
	const projectLinks = [
		links.live && {
			label: "Visit live site",
			href: links.live,
			external: true
		},
		links.github && {
			label: "View source",
			href: links.github,
			external: true
		},
		links.case && {
			label: "Read case study",
			href: links.case,
			external: false
		}
	].filter((link) => Boolean(link));
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": project.title,
		"description": description,
		"ogImage": project.cover_image || project.cover,
		"data-astro-cid-nkggbshs": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-nkggbshs": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" data-astro-cid-nkggbshs>${project.title ? renderTemplate`<article data-astro-cid-nkggbshs><header class="case-hero" data-astro-cid-nkggbshs>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-nkggbshs": true
	}, { "default": ($$result) => renderTemplate`<a class="case-hero__back"${addAttribute(withBase("/work"), "href")} data-astro-cid-nkggbshs>← Kembali ke Portfolio</a><div class="case-hero__content" data-astro-cid-nkggbshs><div class="case-hero__text" data-astro-cid-nkggbshs><p class="case-hero__kicker" data-astro-cid-nkggbshs>${project.role}${siteConfig.portfolio.showYear && project.year && ` / ${project.year}`}</p><h1 data-astro-cid-nkggbshs>${project.title}</h1><p class="case-hero__summary" data-astro-cid-nkggbshs>${project.summary}</p>${projectLinks.length > 0 && renderTemplate`<div class="case-hero__actions" aria-label="Project links" data-astro-cid-nkggbshs>${projectLinks.map((link, index) => renderTemplate`${renderComponent($$result, "Button", $$Button, {
		"href": link.href,
		"variant": index === 0 ? "solid" : "outline",
		"external": link.external,
		"data-astro-cid-nkggbshs": true
	}, { "default": ($$result) => renderTemplate`${link.label}<span aria-hidden="true" data-astro-cid-nkggbshs>↗</span>` })}`)}</div>`}</div><div class="case-hero__image" data-astro-cid-nkggbshs>${(project.cover_image || project.cover) && renderTemplate`${renderComponent($$result, "Picture", $$Picture, {
		"src": project.cover_image || project.cover,
		"alt": project.cover_alt ?? project.coverAlt ?? project.title,
		"widths": [
			600,
			1200,
			1586
		],
		"sizes": "100vw",
		"loading": "eager",
		"fetchpriority": "high",
		"class": "case-cover",
		"data-astro-cid-nkggbshs": true
	})}`}</div></div>` })}</header>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-nkggbshs": true
	}, { "default": ($$result) => renderTemplate`<div class="case-overview" data-astro-cid-nkggbshs>${renderComponent($$result, "GlassCard", $$GlassCard, {
		"padding": "lg",
		"radius": "xl",
		"class": "case-overview__card",
		"data-astro-cid-nkggbshs": true
	}, { "default": ($$result) => renderTemplate`<div class="case-overview__meta" data-astro-cid-nkggbshs>${project.client && renderTemplate`<div data-astro-cid-nkggbshs><dt data-astro-cid-nkggbshs>Client</dt><dd data-astro-cid-nkggbshs>${project.client}</dd></div>`}<div data-astro-cid-nkggbshs><dt data-astro-cid-nkggbshs>Role</dt><dd data-astro-cid-nkggbshs>${project.role}</dd></div>${siteConfig.portfolio.showYear && renderTemplate`<div data-astro-cid-nkggbshs><dt data-astro-cid-nkggbshs>Year</dt><dd data-astro-cid-nkggbshs>${project.year}</dd></div>`}${project.duration && renderTemplate`<div data-astro-cid-nkggbshs><dt data-astro-cid-nkggbshs>Duration</dt><dd data-astro-cid-nkggbshs>${project.duration}</dd></div>`}</div>${siteConfig.portfolio.showTechStack && renderTemplate`<div class="case-facts__stack" data-astro-cid-nkggbshs><p data-astro-cid-nkggbshs>Stack</p><ul data-astro-cid-nkggbshs>${tech.map((item) => renderTemplate`<li data-astro-cid-nkggbshs>${item}</li>`)}</ul></div>`}` })}</div>` })}${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-nkggbshs": true
	}, { "default": ($$result) => renderTemplate`<div class="case-content" data-astro-cid-nkggbshs><div class="case-content__panel" data-astro-cid-nkggbshs><p class="case-content__eyebrow" data-astro-cid-nkggbshs>Project story</p>${hasLeadText && renderTemplate`<p class="case-content__lead" data-astro-cid-nkggbshs>${description}</p>`}<div class="prose" data-astro-cid-nkggbshs>${contentHtml ? renderTemplate`<div data-astro-cid-nkggbshs>${unescapeHTML(contentHtml)}</div>` : hasLeadText && renderTemplate`<p data-astro-cid-nkggbshs>${description}</p>`}</div></div></div>` })}${(project.images || images.length > 0) && renderTemplate`${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-nkggbshs": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "ProjectGallery", $$ProjectGallery, {
		"images": project.images || images,
		"title": project.title,
		"data-astro-cid-nkggbshs": true
	})}` })}`}${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-nkggbshs": true
	}, { "default": ($$result) => renderTemplate`<nav class="case-next" aria-label="Portfolio navigation" data-astro-cid-nkggbshs><p data-astro-cid-nkggbshs>End of case file</p><a${addAttribute(withBase("/work"), "href")} data-astro-cid-nkggbshs>Explore all work<span aria-hidden="true" data-astro-cid-nkggbshs>→</span></a></nav>` })}</article>` : renderTemplate`<section class="case-empty" data-astro-cid-nkggbshs>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-nkggbshs": true
	}, { "default": ($$result) => renderTemplate`<p class="case-empty__eyebrow" data-astro-cid-nkggbshs>Portfolio</p><h1 data-astro-cid-nkggbshs>Detail portfolio belum tersedia</h1><p data-astro-cid-nkggbshs>Portfolio yang Anda cari belum bisa dimuat. Coba kembali setelah data disimpan atau cek kembali tautan dari daftar portfolio.</p><a class="case-empty__link"${addAttribute(withBase("/work"), "href")} data-astro-cid-nkggbshs>← Kembali ke daftar portfolio</a>` })}</section>`}</main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-nkggbshs": true })}` })}`;
}, "C:/ASTRO/template2/src/pages/work/[...slug].astro", void 0);
var $$file = "C:/ASTRO/template2/src/pages/work/[...slug].astro";
var $$url = "/work/[...slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/work/[...slug]@_@astro
var page = () => ____slug__exports;
//#endregion
export { page };
