import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { D as createAstro, O as createComponent, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_DPMtKJSN.mjs";
import { n as $$GlassPanel, r as $$Header, t as $$Footer } from "./Footer_CliEi_pd.mjs";
import { t as $$Container } from "./Container_Cc1qzg7b.mjs";
import { t as $$Button } from "./Button_Cr2G177u.mjs";
import { c as getAllProducts } from "./db_B0DyDVyQ.mjs";
import { t as $$Picture } from "./Picture_tDr0gp0x.mjs";
//#region src/pages/landing/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://your-vercel-domain.vercel.app");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const product = (await getAllProducts()).find((item) => String(item.slug) === String(slug));
	if (!product) throw new Error("Product not found");
	const features = (() => {
		if (Array.isArray(product.features)) return product.features.filter(Boolean).map(String);
		if (typeof product.tags === "string") {
			try {
				const parsed = JSON.parse(product.tags);
				if (Array.isArray(parsed)) return parsed.filter(Boolean).map(String);
			} catch {}
			return product.tags.split(",").map((item) => item.trim()).filter(Boolean);
		}
		if (typeof product.content === "string") return product.content.split("\n").map((item) => item.trim()).filter(Boolean).slice(0, 6);
		return [];
	})();
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `${product.title} | SeminarKit`,
		"description": product.excerpt || "Detail produk SeminarKit",
		"data-astro-cid-nmpbkuke": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-nmpbkuke": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" class="product-detail-page" data-astro-cid-nmpbkuke>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-nmpbkuke": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "GlassPanel", $$GlassPanel, {
		"variant": "solid",
		"padding": "xl",
		"radius": "xl",
		"className": "product-detail-card",
		"data-astro-cid-nmpbkuke": true
	}, { "default": ($$result) => renderTemplate`<div class="product-hero" data-astro-cid-nmpbkuke><div class="product-copy" data-astro-cid-nmpbkuke><p class="eyebrow" data-astro-cid-nmpbkuke>Produk SeminarKit</p><h1 data-astro-cid-nmpbkuke>${product.title}</h1><p class="product-description" data-astro-cid-nmpbkuke>${product.excerpt || "Paket seminar profesional yang siap dipakai."}</p><div class="product-meta" data-astro-cid-nmpbkuke>${product.price && renderTemplate`<span class="pill" data-astro-cid-nmpbkuke>${product.price}</span>`}${product.link && renderTemplate`<span class="pill" data-astro-cid-nmpbkuke>Tautan tersedia</span>`}</div><div class="product-actions" data-astro-cid-nmpbkuke>${product.link && renderTemplate`${renderComponent($$result, "Button", $$Button, {
		"href": product.link,
		"external": true,
		"variant": "solid",
		"size": "md",
		"data-astro-cid-nmpbkuke": true
	}, { "default": ($$result) => renderTemplate`Lihat produk` })}`}${renderComponent($$result, "Button", $$Button, {
		"href": "/landing",
		"variant": "outline",
		"size": "md",
		"data-astro-cid-nmpbkuke": true
	}, { "default": ($$result) => renderTemplate`Kembali ke daftar` })}</div></div>${product.cover_image && renderTemplate`<div class="product-image-wrap" data-astro-cid-nmpbkuke>${renderComponent($$result, "Picture", $$Picture, {
		"src": product.cover_image,
		"alt": product.title || "Gambar produk",
		"width": 600,
		"height": 600,
		"sizes": "(min-width: 900px) 50vw, 100vw",
		"class": "product-image",
		"data-astro-cid-nmpbkuke": true
	})}</div>`}</div><div class="product-body" data-astro-cid-nmpbkuke><section class="product-section" data-astro-cid-nmpbkuke><h2 data-astro-cid-nmpbkuke>Deskripsi</h2><p data-astro-cid-nmpbkuke>${product.content || "Informasi detail akan segera tersedia."}</p></section>${features.length > 0 && renderTemplate`<section class="product-section" data-astro-cid-nmpbkuke><h2 data-astro-cid-nmpbkuke>Keunggulan</h2><ul class="feature-list" data-astro-cid-nmpbkuke>${features.map((feature) => renderTemplate`<li data-astro-cid-nmpbkuke>${feature}</li>`)}</ul></section>`}</div>` })}` })}</main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-nmpbkuke": true })}` })}`;
}, "D:/Kuliah/Magang/template2/src/pages/landing/[slug].astro", void 0);
var $$file = "D:/Kuliah/Magang/template2/src/pages/landing/[slug].astro";
var $$url = "/landing/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/landing/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
