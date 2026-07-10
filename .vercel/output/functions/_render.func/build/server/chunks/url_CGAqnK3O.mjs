//#region src/site.config.ts
var siteConfig = {
	name: "SeminarKit",
	title: "SeminarKit — Perlengkapan Seminar Profesional",
	description: "SeminarKit menyediakan paket perlengkapan seminar lengkap: tas seminar, sertifikat, ID card, note, dan material promosi.",
	author: "Tim SeminarKit",
	url: "https://example.com/seminarkit",
	ogImage: "/og-image.png",
	twitterHandle: "@seminarkit",
	theme: {
		accentColor: "hsl(280, 70%, 60%)",
		defaultColorMode: "system",
		showThemeToggle: true
	},
	nav: { main: [
		{
			name: "Beranda",
			href: "/"
		},
		{
			name: "Produk",
			href: "/landing"
		},
		{
			name: "Portfolio",
			href: "/work"
		},
		{
			name: "Blog",
			href: "/blog"
		},
		{
			name: "Tentang",
			href: "/about"
		}
	] },
	features: {
		blog: true,
		portfolio: true,
		landing: true,
		rss: true,
		sitemap: true
	},
	social: {
		github: void 0,
		twitter: "https://twitter.com/seminarkit",
		linkedin: void 0
	},
	blog: {
		postsPerPage: 6,
		showToc: true,
		showReadingTime: true,
		showShareButtons: true,
		showRelatedPosts: true
	},
	portfolio: {
		projectsPerPage: 9,
		showTechStack: true,
		showYear: true
	}
};
//#endregion
//#region src/lib/url.ts
var BASE = "/".replace(/\/$/, "");
function withBase(path) {
	if (!path) return path;
	if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("#") || /^(mailto:|tel:)/i.test(path)) return path;
	if (!path.startsWith("/")) return path;
	if (BASE && (path === BASE || path.startsWith(BASE + "/"))) return path;
	return BASE + path;
}
//#endregion
export { siteConfig as n, withBase as t };
