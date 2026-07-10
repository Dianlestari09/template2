import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { O as createComponent, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_hBMFtw2l.mjs";
import { t as withBase } from "./url_CGAqnK3O.mjs";
import { n as $$GlassPanel, r as $$Header, t as $$Footer } from "./Footer_Dn3ReZgh.mjs";
import { t as $$Container } from "./Container_DC2M1AfB.mjs";
import { t as $$Button } from "./Button_BxPVawMq.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": "Page not found",
		"description": "The page you were looking for doesn't exist or has moved.",
		"noIndex": true,
		"data-astro-cid-ibpinaeu": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-ibpinaeu": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" class="main-content" data-astro-cid-ibpinaeu><section class="section" data-astro-cid-ibpinaeu>${renderComponent($$result, "Container", $$Container, {
		"size": "md",
		"data-astro-cid-ibpinaeu": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "GlassPanel", $$GlassPanel, {
		"variant": "solid",
		"padding": "xl",
		"className": "notfound",
		"data-astro-cid-ibpinaeu": true
	}, { "default": ($$result) => renderTemplate`<p class="notfound__code" aria-hidden="true" data-astro-cid-ibpinaeu>404</p><h1 class="notfound__title" data-astro-cid-ibpinaeu>Page not found</h1><p class="notfound__text" data-astro-cid-ibpinaeu>The page you were looking for doesn't exist or may have moved. Let's get you back on track.</p><div class="notfound__actions" data-astro-cid-ibpinaeu>${renderComponent($$result, "Button", $$Button, {
		"href": withBase("/"),
		"variant": "solid",
		"data-astro-cid-ibpinaeu": true
	}, { "default": ($$result) => renderTemplate`Back to home` })}${renderComponent($$result, "Button", $$Button, {
		"href": withBase("/blog"),
		"variant": "glass",
		"data-astro-cid-ibpinaeu": true
	}, { "default": ($$result) => renderTemplate`Browse the blog` })}</div>` })}` })}</section></main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-ibpinaeu": true })}` })}`;
}, "C:/ASTRO/template2/src/pages/404.astro", void 0);
var $$file = "C:/ASTRO/template2/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
