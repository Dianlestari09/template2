import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { O as createComponent, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_DPMtKJSN.mjs";
import { n as siteConfig } from "./url_CGAqnK3O.mjs";
import { r as $$Header, t as $$Footer } from "./Footer_CliEi_pd.mjs";
import { l as getAllProjects } from "./db_B0DyDVyQ.mjs";
import { t as $$WorkArchive } from "./WorkArchive_BEam26S9.mjs";
//#region src/pages/work/index.astro
var work_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const allProjects = (await getAllProjects()).sort((a, b) => {
		if ((a.featured ? 1 : 0) !== (b.featured ? 1 : 0)) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
		return (b.year || 0) - (a.year || 0);
	});
	const perPage = Math.max(1, Math.floor(siteConfig.portfolio.projectsPerPage));
	const totalPages = Math.max(1, Math.ceil(allProjects.length / perPage));
	const projects = allProjects.slice(0, perPage);
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Galeri",
		"description": "Galeri paket dan contoh penggunaan SeminarKit dalam acara nyata."
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {})}${maybeRenderHead($$result)}<main id="main" tabindex="-1">${renderComponent($$result, "WorkArchive", $$WorkArchive, {
		"projects": projects,
		"totalProjects": allProjects.length,
		"currentPage": 1,
		"totalPages": totalPages,
		"perPage": perPage,
		"showTechStack": siteConfig.portfolio.showTechStack,
		"showYear": siteConfig.portfolio.showYear
	})}</main>${renderComponent($$result, "Footer", $$Footer, {})}` })}`;
}, "D:/Kuliah/Magang/template2/src/pages/work/index.astro", void 0);
var $$file = "D:/Kuliah/Magang/template2/src/pages/work/index.astro";
var $$url = "/work";
//#endregion
//#region \0virtual:astro:page:src/pages/work/index@_@astro
var page = () => work_exports;
//#endregion
export { page };
