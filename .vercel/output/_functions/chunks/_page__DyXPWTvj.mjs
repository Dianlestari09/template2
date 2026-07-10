import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { D as createAstro, O as createComponent, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_hBMFtw2l.mjs";
import { n as siteConfig } from "./url_CGAqnK3O.mjs";
import { r as $$Header, t as $$Footer } from "./Footer_Dn3ReZgh.mjs";
import { i as getAllProjects } from "./db_DK9W4roq.mjs";
import { t as $$WorkArchive } from "./WorkArchive_DNdnMyqT.mjs";
//#region src/pages/work/page/[page].astro
var _page__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Page,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://your-vercel-domain.vercel.app");
var getStaticPaths = (async () => {
	const projects = (await getAllProjects()).sort((a, b) => {
		if ((a.featured ? 1 : 0) !== (b.featured ? 1 : 0)) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
		return (b.year || 0) - (a.year || 0);
	});
	const perPage = Math.max(1, Math.floor(siteConfig.portfolio.projectsPerPage));
	const totalPages = Math.max(1, Math.ceil(projects.length / perPage));
	const paths = [];
	for (let page = 2; page <= totalPages; page++) paths.push({
		params: { page: String(page) },
		props: {
			projects: projects.slice((page - 1) * perPage, page * perPage),
			totalProjects: projects.length,
			currentPage: page,
			totalPages,
			perPage
		}
	});
	return paths;
});
var $$Page = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Page;
	const { projects, totalProjects, currentPage, totalPages, perPage } = Astro.props;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `Work — Page ${currentPage}`,
		"description": "Galeri paket SeminarKit dan contoh penggunaan di acara nyata."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main id="main" tabindex="-1">${renderComponent($$result, "WorkArchive", $$WorkArchive, {
		"projects": projects,
		"totalProjects": totalProjects,
		"currentPage": currentPage,
		"totalPages": totalPages,
		"perPage": perPage,
		"showTechStack": siteConfig.portfolio.showTechStack,
		"showYear": siteConfig.portfolio.showYear
	})}</main>${renderComponent($$result, "Footer", $$Footer, {})}` })}`;
}, "C:/ASTRO/template2/src/pages/work/page/[page].astro", void 0);
var $$file = "C:/ASTRO/template2/src/pages/work/page/[page].astro";
var $$url = "/work/page/[page]";
//#endregion
//#region \0virtual:astro:page:src/pages/work/page/[page]@_@astro
var page = () => _page__exports;
//#endregion
export { page };
