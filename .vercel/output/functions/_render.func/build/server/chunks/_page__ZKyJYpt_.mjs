import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { D as createAstro, O as createComponent, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_DPMtKJSN.mjs";
import { n as siteConfig } from "./url_CGAqnK3O.mjs";
import { r as $$Header, t as $$Footer } from "./Footer_CliEi_pd.mjs";
import { t as $$Container } from "./Container_Cc1qzg7b.mjs";
import { s as getAllPosts } from "./db_B0DyDVyQ.mjs";
import { t as $$PostGrid } from "./PostGrid_BbivHANA.mjs";
import { t as $$Pagination } from "./Pagination_CV4N08mw.mjs";
//#region src/pages/blog/page/[page].astro
var _page__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Page,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://your-vercel-domain.vercel.app");
var getStaticPaths = (async () => {
	const posts = mapRowsToPosts(await getAllPosts());
	const perPage = siteConfig.blog.postsPerPage;
	const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
	const paths = [];
	for (let page = 2; page <= totalPages; page++) paths.push({
		params: { page: String(page) },
		props: {
			posts: posts.slice((page - 1) * perPage, page * perPage),
			currentPage: page,
			totalPages
		}
	});
	return paths;
});
var $$Page = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Page;
	const { posts, currentPage, totalPages } = Astro.props;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `Blog — Page ${currentPage}`,
		"description": "Semua panduan, checklist, dan cerita SeminarKit untuk acara seminar profesional.",
		"data-astro-cid-pjidouja": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-pjidouja": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" class="main-content" data-astro-cid-pjidouja><section class="section" data-astro-cid-pjidouja>${renderComponent($$result, "Container", $$Container, { "data-astro-cid-pjidouja": true }, { "default": ($$result) => renderTemplate`<h2 class="section-title" data-astro-cid-pjidouja>Semua Artikel</h2>${renderComponent($$result, "PostGrid", $$PostGrid, {
		"posts": posts,
		"data-astro-cid-pjidouja": true
	})}${renderComponent($$result, "Pagination", $$Pagination, {
		"currentPage": currentPage,
		"totalPages": totalPages,
		"basePath": "/blog",
		"data-astro-cid-pjidouja": true
	})}` })}</section></main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-pjidouja": true })}` })}`;
}, "D:/Kuliah/Magang/template2/src/pages/blog/page/[page].astro", void 0);
var $$file = "D:/Kuliah/Magang/template2/src/pages/blog/page/[page].astro";
var $$url = "/blog/page/[page]";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/page/[page]@_@astro
var page = () => _page__exports;
//#endregion
export { page };
