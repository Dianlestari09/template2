import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { O as createComponent, b as addAttribute, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_DPMtKJSN.mjs";
import { n as siteConfig, t as withBase } from "./url_CGAqnK3O.mjs";
import { r as $$Header, t as $$Footer } from "./Footer_CliEi_pd.mjs";
import { t as $$Container } from "./Container_Cc1qzg7b.mjs";
import { t as $$Button } from "./Button_Cr2G177u.mjs";
import { t as $$GlassCard } from "./GlassCard_BIWfw9Wv.mjs";
import { t as $$Section } from "./Section_C2vyPfgU.mjs";
import { t as $$Badge } from "./Badge_EQ5LBhme.mjs";
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const showcases = [
		{
			index: "01",
			type: "Produk",
			title: "Paket Seminar Standar",
			description: "Paket lengkap untuk kebutuhan seminar kecil hingga menengah: tas, buku, sertifikat, dan ID card.",
			href: "/landing",
			cta: "Lihat produk",
			className: "showcase--journal"
		},
		{
			index: "02",
			type: "Galeri",
			title: "Contoh paket dan penggunaan",
			description: "Galeri foto dan studi kasus penggunaan SeminarKit di acara nyata.",
			href: "/work",
			cta: "Telusuri galeri",
			className: "showcase--work"
		},
		{
			index: "03",
			type: "Panduan",
			title: "Panduan penyelenggara seminar",
			description: "Panduan lengkap cara menyelenggarakan seminar yang profesional, mulai dari logistik hingga merchandise.",
			href: "/blog",
			cta: "Baca panduan",
			className: "showcase--landing"
		}
	];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `${siteConfig.name} — Solusi Perlengkapan Seminar`,
		"description": "SeminarKit: paket perlengkapan seminar siap pakai dan panduan penyelenggaraan.",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-lcdefpme": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" data-astro-cid-lcdefpme><section class="home-hero" data-astro-cid-lcdefpme>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`<h1 data-astro-cid-lcdefpme>SeminarKit.<br data-astro-cid-lcdefpme><span data-astro-cid-lcdefpme>Perlengkapan Seminar Profesional.</span></h1><div class="home-hero__footer" data-astro-cid-lcdefpme><p data-astro-cid-lcdefpme>SeminarKit menyediakan solusi perlengkapan seminar yang praktis dan profesional untuk acara pendidikan, korporat, dan komunitas.</p><div class="home-hero__actions" data-astro-cid-lcdefpme>${renderComponent($$result, "Button", $$Button, {
		"href": withBase("/landing"),
		"variant": "solid",
		"size": "md",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`Lihat Paket` })}${siteConfig.social.github && renderTemplate`${renderComponent($$result, "Button", $$Button, {
		"href": siteConfig.social.github,
		"external": true,
		"variant": "outline",
		"size": "md",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`Sumber <span aria-hidden="true" data-astro-cid-lcdefpme>↗</span>` })}`}</div></div><div class="home-hero__orbit" aria-hidden="true" data-astro-cid-lcdefpme><span data-astro-cid-lcdefpme>Tulis</span><span data-astro-cid-lcdefpme>Tampilkan</span><span data-astro-cid-lcdefpme>Luncurkan</span></div>` })}</section>${renderComponent($$result, "Section", $$Section, {
		"id": "showcase",
		"eyebrow": "Produk Unggulan",
		"title": "Paket Seminar Siap Pakai",
		"subtitle": "Pilih paket sesuai kebutuhan acara Anda: standar, premium, atau kustom.",
		"align": "left",
		"container": "xl",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`<div class="showcase-list" data-astro-cid-lcdefpme>${showcases.map((item) => renderTemplate`<article${addAttribute(["showcase", item.className], "class:list")} data-astro-cid-lcdefpme><div class="showcase__copy" data-astro-cid-lcdefpme><div class="showcase__label" data-astro-cid-lcdefpme><span data-astro-cid-lcdefpme>${item.index}</span>${renderComponent($$result, "Badge", $$Badge, {
		"variant": "accent",
		"size": "sm",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`${item.type}` })}</div><h2 data-astro-cid-lcdefpme>${item.title}</h2><p data-astro-cid-lcdefpme>${item.description}</p><a${addAttribute(withBase(item.href), "href")} data-astro-cid-lcdefpme>${item.cta}<span aria-hidden="true" data-astro-cid-lcdefpme> →</span></a></div>${renderComponent($$result, "GlassCard", $$GlassCard, {
		"padding": "none",
		"radius": "xl",
		"class": "showcase__preview",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`${item.index === "01" && renderTemplate`<div class="preview preview--journal" data-astro-cid-lcdefpme><div class="preview__nav" data-astro-cid-lcdefpme><i data-astro-cid-lcdefpme></i><span data-astro-cid-lcdefpme>Paket Standar</span><small data-astro-cid-lcdefpme>Siap kirim</small></div><div class="preview__editorial" data-astro-cid-lcdefpme><span data-astro-cid-lcdefpme>Perlengkapan dasar</span><h3 data-astro-cid-lcdefpme>Semua kebutuhan seminar</h3><p data-astro-cid-lcdefpme>Tas peserta, blocknote, pulpen, dan sertifikat dikemas rapi untuk acara Anda.</p></div><div class="preview__lines" data-astro-cid-lcdefpme><i data-astro-cid-lcdefpme></i><i data-astro-cid-lcdefpme></i><i data-astro-cid-lcdefpme></i></div></div>`}${item.index === "02" && renderTemplate`<div class="preview preview--work" data-astro-cid-lcdefpme><div class="preview__poster" data-astro-cid-lcdefpme><span data-astro-cid-lcdefpme>PRO / 02</span><div class="preview__shape" data-astro-cid-lcdefpme></div><strong data-astro-cid-lcdefpme>Seminar<br data-astro-cid-lcdefpme>Kustom</strong></div><div class="preview__caption" data-astro-cid-lcdefpme><span data-astro-cid-lcdefpme>Branding</span><span data-astro-cid-lcdefpme>Rapi ↗</span></div></div>`}${item.index === "03" && renderTemplate`<div class="preview preview--landing" data-astro-cid-lcdefpme><span class="preview__edition" data-astro-cid-lcdefpme>PAKET PREMIUM</span><div class="preview__object" aria-hidden="true" data-astro-cid-lcdefpme></div><h3 data-astro-cid-lcdefpme>Persiapan acara<br data-astro-cid-lcdefpme>yang profesional.</h3><span class="preview__button" data-astro-cid-lcdefpme>Lihat detail ↗</span></div>`}` })}</article>`)}</div>` })}<section class="system-note" data-astro-cid-lcdefpme>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`<div data-astro-cid-lcdefpme><span class="system-note__index" data-astro-cid-lcdefpme>04 / FOUNDATION</span><h2 data-astro-cid-lcdefpme>Dirancang untuk kelancaran acara.</h2></div><div class="system-note__grid" data-astro-cid-lcdefpme><p data-astro-cid-lcdefpme><strong data-astro-cid-lcdefpme>Lapisan Konten</strong><span data-astro-cid-lcdefpme>Data terstruktur untuk produk, proyek, dan materi acara.</span></p><p data-astro-cid-lcdefpme><strong data-astro-cid-lcdefpme>Media responsif</strong><span data-astro-cid-lcdefpme>Gambar modern dengan fallback praktis untuk semua perangkat.</span></p><p data-astro-cid-lcdefpme><strong data-astro-cid-lcdefpme>Aksesibilitas</strong><span data-astro-cid-lcdefpme>Efek terkontrol, kontras kuat, dan preferensi transparansi.</span></p><p data-astro-cid-lcdefpme><strong data-astro-cid-lcdefpme>Runtime minimal</strong><span data-astro-cid-lcdefpme>Halaman dirender server dan interaksi native untuk performa terbaik.</span></p></div>` })}</section><section class="home-cta" data-astro-cid-lcdefpme>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`<p data-astro-cid-lcdefpme>Mulai persiapan acara Anda dengan perlengkapan yang tepat.</p><h2 data-astro-cid-lcdefpme>Pilih paket dan lengkapi seminar Anda.</h2><div data-astro-cid-lcdefpme>${renderComponent($$result, "Button", $$Button, {
		"href": withBase("/blog"),
		"variant": "outline",
		"size": "md",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`Panduan` })}${renderComponent($$result, "Button", $$Button, {
		"href": withBase("/work"),
		"variant": "outline",
		"size": "md",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`Galeri` })}${renderComponent($$result, "Button", $$Button, {
		"href": withBase("/landing"),
		"variant": "solid",
		"size": "md",
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`Produk` })}</div>` })}</section></main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-lcdefpme": true })}` })}`;
}, "D:/Kuliah/Magang/template2/src/pages/index.astro", void 0);
var $$file = "D:/Kuliah/Magang/template2/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
