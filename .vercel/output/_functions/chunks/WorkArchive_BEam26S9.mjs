import { D as createAstro, O as createComponent, b as addAttribute, c as Fragment, m as renderTemplate, o as renderComponent, r as renderScript, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as withBase } from "./url_CGAqnK3O.mjs";
import { t as $$Container } from "./Container_Cc1qzg7b.mjs";
import { t as $$GlassCard } from "./GlassCard_BIWfw9Wv.mjs";
import { t as $$Picture } from "./Picture_tDr0gp0x.mjs";
import { t as $$Pagination } from "./Pagination_CV4N08mw.mjs";
//#region src/components/portfolio/ProjectCard.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProjectCard;
	const { title, summary, cover, coverAlt = title, tech, role, year, href, index, featured = false, showTechStack = true, showYear = true } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<article${addAttribute(["project", { "project--featured": featured }], "class:list")} data-astro-cid-dapwerim>${renderComponent($$result, "GlassCard", $$GlassCard, {
		"href": href,
		"padding": "none",
		"radius": "xl",
		"class": "project__card",
		"data-astro-cid-dapwerim": true
	}, { "default": ($$result) => renderTemplate`<div class="project__visual" data-astro-cid-dapwerim>${cover ? renderTemplate`${renderComponent($$result, "Picture", $$Picture, {
		"src": cover,
		"alt": coverAlt,
		"widths": [
			400,
			800,
			1200
		],
		"sizes": featured ? "(min-width: 900px) 60vw, 100vw" : "(min-width: 900px) 40vw, 100vw",
		"loading": index === 0 ? "eager" : "lazy",
		"fetchpriority": index === 0 ? "high" : void 0,
		"class": "project__image",
		"data-astro-cid-dapwerim": true
	})}` : renderTemplate`<div class="project__image" aria-hidden="true" data-astro-cid-dapwerim></div>`}<span class="project__number" aria-hidden="true" data-astro-cid-dapwerim>${String(index).padStart(2, "0")}</span>${featured && renderTemplate`<span class="project__flag" data-astro-cid-dapwerim>Pilihan</span>`}</div><div class="project__body" data-astro-cid-dapwerim><div class="project__meta" data-astro-cid-dapwerim>${showYear && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span data-astro-cid-dapwerim>${year}</span><span aria-hidden="true" data-astro-cid-dapwerim>/</span>` })}`}<span data-astro-cid-dapwerim>${role}</span></div><h2 class="project__title" data-astro-cid-dapwerim>${title}</h2><p class="project__summary" data-astro-cid-dapwerim>${summary}</p><div${addAttribute(["project__footer", { "project__footer--solo": !showTechStack }], "class:list")} data-astro-cid-dapwerim>${showTechStack && renderTemplate`<ul class="project__tech" aria-label="Technology stack" data-astro-cid-dapwerim>${tech.slice(0, featured ? 5 : 3).map((item) => renderTemplate`<li data-astro-cid-dapwerim>${item}</li>`)}</ul>`}<span class="project__arrow" aria-hidden="true" data-astro-cid-dapwerim>↗</span></div></div>` })}</article>`;
}, "D:/Kuliah/Magang/template2/src/components/portfolio/ProjectCard.astro", void 0);
//#endregion
//#region src/components/portfolio/WorkArchive.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$WorkArchive = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$WorkArchive;
	const { projects = [], totalProjects = 0, currentPage = 1, totalPages = 1, perPage = 12, showTechStack = false, showYear = false } = Astro.props;
	const safeProjects = Array.isArray(projects) ? projects : [];
	function parseTechValue(value) {
		if (Array.isArray(value)) return value.map((item) => String(item));
		if (typeof value === "string") {
			var raw = value.trim();
			if (!raw) return [];
			try {
				var parsed = JSON.parse(raw);
				if (Array.isArray(parsed)) return parsed.map((item) => String(item));
			} catch (e) {}
			return raw.split(",").map((item) => item.trim()).filter(Boolean);
		}
		return [];
	}
	const normalizedProjects = safeProjects.map((project) => {
		const isContentEntry = project && project.data;
		const data = isContentEntry ? project.data : project;
		const tech = parseTechValue(data.tech ?? []);
		return {
			id: isContentEntry ? project.id : project.id,
			title: data.title || project.title,
			summary: data.summary || data.excerpt || project.summary || project.excerpt || "",
			cover: data.cover ?? data.cover_image ?? project.cover ?? project.cover_image,
			coverAlt: data.coverAlt ?? data.cover_alt ?? data.title ?? project.title,
			tech,
			role: data.role || project.role || "",
			year: data.year ?? project.year ?? 0,
			featured: data.featured || data.is_featured || false,
			href: withBase(`/work/${isContentEntry ? project.id : project.slug || project.id}`)
		};
	});
	const filters = [...normalizedProjects.flatMap((project) => project.tech).reduce((counts, item) => {
		counts.set(item, (counts.get(item) ?? 0) + 1);
		return counts;
	}, /* @__PURE__ */ new Map())].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 5).map(([name]) => name);
	const showFilters = showTechStack && totalPages <= 1 && filters.length > 0;
	const indexOffset = (currentPage - 1) * perPage;
	const rangeStart = safeProjects.length > 0 ? indexOffset + 1 : 0;
	const rangeEnd = indexOffset + safeProjects.length;
	return renderTemplate`${maybeRenderHead($$result)}<section class="work-hero" aria-labelledby="work-title" data-astro-cid-4bg4ncfp>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-4bg4ncfp": true
	}, { "default": ($$result) => renderTemplate`<div class="work-hero__index" aria-hidden="true" data-astro-cid-4bg4ncfp>${String(rangeStart).padStart(2, "0")}—${String(rangeEnd).padStart(2, "0")}</div><div class="work-hero__content" data-astro-cid-4bg4ncfp><p class="work-hero__eyebrow" data-astro-cid-4bg4ncfp>Arsip proyek${showYear && " / 2022—2026"}${totalPages > 1 && ` / Halaman ${currentPage} dari ${totalPages}`}</p><h1 id="work-title" data-astro-cid-4bg4ncfp>Galeri paket digunakan dalam <em data-astro-cid-4bg4ncfp>acara nyata</em>.</h1><p class="work-hero__intro" data-astro-cid-4bg4ncfp>Proyek dan contoh penggunaan yang menampilkan paket SeminarKit dalam situasi nyata.</p></div>` })}</section><section class="project-index" aria-labelledby="project-index-title" data-astro-cid-4bg4ncfp>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-4bg4ncfp": true
	}, { "default": ($$result) => renderTemplate`<div class="project-index__bar" data-astro-cid-4bg4ncfp><div data-astro-cid-4bg4ncfp><p class="project-index__label" data-astro-cid-4bg4ncfp>Galeri / ${String(totalProjects).padStart(2, "0")} paket</p><h2 id="project-index-title" data-astro-cid-4bg4ncfp>Contoh penggunaan paket</h2></div>${showFilters && renderTemplate`<div class="filters" role="group" aria-label="Filter projects by technology" data-astro-cid-4bg4ncfp><button class="filter is-active" type="button" data-filter="all" aria-pressed="true" data-astro-cid-4bg4ncfp>Semua</button>${filters.map((filter) => renderTemplate`<button class="filter" type="button"${addAttribute(filter, "data-filter")} aria-pressed="false" data-astro-cid-4bg4ncfp>${filter}</button>`)}</div>`}</div><p class="filter-status sr-only" aria-live="polite" data-astro-cid-4bg4ncfp></p>${normalizedProjects.length > 0 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="project-grid" data-astro-cid-4bg4ncfp>${normalizedProjects.map((project, index) => renderTemplate`<div${addAttribute(["project-shell", { "project-shell--featured": project.featured }], "class:list")}${addAttribute(showTechStack ? JSON.stringify(project.tech) : void 0, "data-technologies")} data-astro-cid-4bg4ncfp>${renderComponent($$result, "ProjectCard", $$ProjectCard, {
		"title": project.title,
		"summary": project.summary,
		"cover": project.cover,
		"coverAlt": project.coverAlt,
		"tech": project.tech,
		"role": project.role,
		"year": project.year,
		"href": project.href,
		"index": indexOffset + index + 1,
		"featured": project.featured,
		"showTechStack": showTechStack,
		"showYear": showYear,
		"data-astro-cid-4bg4ncfp": true
	})}</div>`)}</div>${renderComponent($$result, "Pagination", $$Pagination, {
		"currentPage": currentPage,
		"totalPages": totalPages,
		"basePath": "/work",
		"data-astro-cid-4bg4ncfp": true
	})}` })}` : renderTemplate`<p class="empty-state" data-astro-cid-4bg4ncfp>Galeri paket sedang disusun. Silakan kunjungi kembali nanti.</p>`}` })}</section>${renderScript($$result, "D:/Kuliah/Magang/template2/src/components/portfolio/WorkArchive.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Kuliah/Magang/template2/src/components/portfolio/WorkArchive.astro", void 0);
//#endregion
export { $$WorkArchive as t };
