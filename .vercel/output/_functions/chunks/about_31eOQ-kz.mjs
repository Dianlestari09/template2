import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { O as createComponent, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as $$BaseLayout } from "./BaseLayout_hBMFtw2l.mjs";
import { n as siteConfig, t as withBase } from "./url_CGAqnK3O.mjs";
import { n as $$GlassPanel, r as $$Header, t as $$Footer } from "./Footer_Dn3ReZgh.mjs";
import { t as $$Container } from "./Container_DC2M1AfB.mjs";
import { t as $$Button } from "./Button_BxPVawMq.mjs";
import { t as $$GlassCard } from "./GlassCard_BGeSJzan.mjs";
import { t as $$Section } from "./Section_1RJEfjAJ.mjs";
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(($$result, $$props, $$slots) => {
	const formats = [
		{
			number: "01",
			label: "Produk",
			title: "Paket Seminar Siap Pakai",
			description: "Paket lengkap dengan semua perlengkapan standar: tas seminar, blocknote, pulpen, sertifikat, dan ID card.",
			href: "/landing"
		},
		{
			number: "02",
			label: "Galeri",
			title: "Contoh acara dan tata letak",
			description: "Galeri penggunaan produk SeminarKit dalam berbagai skenario acara.",
			href: "/work"
		},
		{
			number: "03",
			label: "Panduan",
			title: "Panduan penyelenggara seminar",
			description: "Artikel dan checklist praktis untuk menyelenggarakan seminar yang rapi dan profesional.",
			href: "/blog"
		}
	];
	const stack = [
		{
			name: "SeminarKit Paket",
			category: "Produk",
			detail: "Paket disusun untuk memudahkan penyelenggaraan seminar, lengkap dan praktis."
		},
		{
			name: "Kustomisasi",
			category: "Layanan",
			detail: "Opsi branding & kustom untuk menyesuaikan logo, warna, dan materi promosi."
		},
		{
			name: "Panduan Operasional",
			category: "Panduan",
			detail: "Checklist pra-acara, logistik, dan tips pemasaran untuk peserta dan penyelenggara."
		},
		{
			name: "Kualitas Bahan",
			category: "Standar",
			detail: "Material terpilih untuk kenyamanan peserta dan tampilan profesional."
		},
		{
			name: "Dukungan Pelanggan",
			category: "Layanan",
			detail: "Tim bantuan siap membantu pemesanan, pengiriman, dan kustomisasi."
		}
	];
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": `Tentang | ${siteConfig.name}`,
		"description": `${siteConfig.name} menyediakan paket perlengkapan seminar siap pakai untuk berbagai kebutuhan acara.`,
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "data-astro-cid-ta2fbyqs": true })}${maybeRenderHead($$result)}<main id="main" tabindex="-1" data-astro-cid-ta2fbyqs><section class="about-hero" data-astro-cid-ta2fbyqs>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "GlassPanel", $$GlassPanel, {
		"variant": "solid",
		"padding": "xl",
		"radius": "xl",
		"className": "about-hero__panel",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`<div class="about-hero__meta" data-astro-cid-ta2fbyqs><span data-astro-cid-ta2fbyqs>Tentang sistem</span><span data-astro-cid-ta2fbyqs>SeminarKit · Perlengkapan seminar</span></div><div class="about-hero__body" data-astro-cid-ta2fbyqs><div class="about-hero__title" data-astro-cid-ta2fbyqs><p data-astro-cid-ta2fbyqs>Dipersembahkan oleh ${siteConfig.author}</p><h1 data-astro-cid-ta2fbyqs>Solusi Perlengkapan Seminar yang Praktis dan Profesional.</h1></div><div class="about-hero__statement" data-astro-cid-ta2fbyqs><p data-astro-cid-ta2fbyqs>SeminarKit dirancang untuk memudahkan penyelenggara seminar: paket komprehensif, opsi kustom, dan dukungan operasional.</p><p data-astro-cid-ta2fbyqs>Kami menyediakan produk berkualitas dan panduan lengkap agar acara berjalan lancar dan berkesan.</p></div></div><div class="about-hero__footer" data-astro-cid-ta2fbyqs><span aria-hidden="true" data-astro-cid-ta2fbyqs>AH / 07</span><div class="about-hero__actions" data-astro-cid-ta2fbyqs>${siteConfig.social.github && renderTemplate`${renderComponent($$result, "Button", $$Button, {
		"href": siteConfig.social.github,
		"external": true,
		"variant": "solid",
		"size": "md",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`Lihat di GitHub <span aria-hidden="true" data-astro-cid-ta2fbyqs>↗</span>` })}`}${renderComponent($$result, "Button", $$Button, {
		"href": withBase("/landing"),
		"variant": "outline",
		"size": "md",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`Lihat demo` })}</div></div>` })}` })}</section>${renderComponent($$result, "Section", $$Section, {
		"eyebrow": "Satu sistem, tiga format",
		"title": "Dirancang sesuai kebutuhan acara Anda.",
		"subtitle": "Mulai dengan paket siap pakai, lalu sesuaikan bagian yang diperlukan untuk acara Anda.",
		"align": "left",
		"container": "xl",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`<div class="format-list" data-astro-cid-ta2fbyqs>${formats.map((format) => renderTemplate`${renderComponent($$result, "GlassCard", $$GlassCard, {
		"href": withBase(format.href),
		"padding": "lg",
		"radius": "xl",
		"class": "format-card",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`<div class="format-card__meta" data-astro-cid-ta2fbyqs><span data-astro-cid-ta2fbyqs>${format.number}</span><span data-astro-cid-ta2fbyqs>${format.label}</span></div><h2 data-astro-cid-ta2fbyqs>${format.title}</h2><p data-astro-cid-ta2fbyqs>${format.description}</p><span class="format-card__link" data-astro-cid-ta2fbyqs>Telusuri <i aria-hidden="true" data-astro-cid-ta2fbyqs>↗</i></span>` })}`)}</div>` })}<section class="principle" data-astro-cid-ta2fbyqs>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`<p class="principle__index" data-astro-cid-ta2fbyqs>Prinsip / 04</p><blockquote data-astro-cid-ta2fbyqs>Tampilan harus mendukung konten,<span data-astro-cid-ta2fbyqs>tidak bersaing dengannya.</span></blockquote><div class="principle__note" data-astro-cid-ta2fbyqs><span class="principle__mark" aria-hidden="true" data-astro-cid-ta2fbyqs>✦</span><p data-astro-cid-ta2fbyqs>Efek glass hanya digunakan untuk memperjelas kelompok atau kedalaman. Di tempat lain, tipografi, spasi, dan batas yang bekerja lebih halus.</p></div>` })}</section>${renderComponent($$result, "Section", $$Section, {
		"id": "stack",
		"eyebrow": "Under the surface",
		"title": "A modern, legible stack.",
		"subtitle": "The implementation favors platform features and durable conventions over client-side machinery.",
		"align": "left",
		"container": "xl",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`<ol class="stack-list" data-astro-cid-ta2fbyqs>${stack.map((item, index) => renderTemplate`<li data-astro-cid-ta2fbyqs><span class="stack-list__number" data-astro-cid-ta2fbyqs>${String(index + 1).padStart(2, "0")}</span><span class="stack-list__category" data-astro-cid-ta2fbyqs>${item.category}</span><strong data-astro-cid-ta2fbyqs>${item.name}</strong><p data-astro-cid-ta2fbyqs>${item.detail}</p></li>`)}</ol>` })}<section class="about-cta" data-astro-cid-ta2fbyqs>${renderComponent($$result, "Container", $$Container, {
		"size": "xl",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`<div class="about-cta__copy" data-astro-cid-ta2fbyqs><p data-astro-cid-ta2fbyqs>Gunakan sebagai dasar</p><h2 data-astro-cid-ta2fbyqs>Bentuk SeminarKit sesuai kebutuhan Anda.</h2></div><div class="about-cta__aside" data-astro-cid-ta2fbyqs><p data-astro-cid-ta2fbyqs>Mulai dari paket dasar lalu kembangkan desain, materi, dan branding sesuai acara Anda.</p><div data-astro-cid-ta2fbyqs>${siteConfig.social.github && renderTemplate`${renderComponent($$result, "Button", $$Button, {
		"href": siteConfig.social.github,
		"external": true,
		"variant": "solid",
		"size": "md",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`Dapatkan sumber <span aria-hidden="true" data-astro-cid-ta2fbyqs>↗</span>` })}`}${siteConfig.social.twitter && renderTemplate`${renderComponent($$result, "Button", $$Button, {
		"href": siteConfig.social.twitter,
		"external": true,
		"variant": "outline",
		"size": "md",
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate`Ikuti pembaruan` })}`}</div></div>` })}</section></main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-ta2fbyqs": true })}` })}`;
}, "C:/ASTRO/template2/src/pages/about.astro", void 0);
var $$file = "C:/ASTRO/template2/src/pages/about.astro";
var $$url = "/about";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
