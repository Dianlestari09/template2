import { D as createAstro, O as createComponent, T as unescapeHTML, b as addAttribute, c as Fragment, d as renderSlot, m as renderTemplate, o as renderComponent, r as renderScript, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { n as siteConfig, t as withBase } from "./url_CGAqnK3O.mjs";
//#region src/components/common/Header.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const currentPath = Astro.url.pathname;
	function isActive(href) {
		const target = withBase(href);
		const home = withBase("/");
		if (href === "/") return currentPath === home;
		return currentPath === target || currentPath.startsWith(target + "/");
	}
	const navItems = siteConfig.nav.main.filter((item) => {
		if (item.href === "/blog" && !siteConfig.features.blog) return false;
		if (item.href === "/work" && !siteConfig.features.portfolio) return false;
		if (item.href === "/landing" && !siteConfig.features.landing) return false;
		return true;
	});
	return renderTemplate`${maybeRenderHead($$result)}<header class="site-header glass-nav" data-astro-cid-bi27l4kv><div class="container header-container" data-astro-cid-bi27l4kv><!-- Logo/Brand --><a${addAttribute(withBase("/"), "href")} class="brand" aria-label="Home" data-astro-cid-bi27l4kv><span class="brand-text" data-astro-cid-bi27l4kv>${siteConfig.name}</span></a><!-- Mobile Menu Toggle --><button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navigation" data-astro-cid-bi27l4kv><span data-astro-cid-bi27l4kv></span><span data-astro-cid-bi27l4kv></span><span data-astro-cid-bi27l4kv></span></button><!-- Navigation --><nav id="navigation" class="nav-menu" aria-label="Main navigation" data-astro-cid-bi27l4kv><ul class="nav-list" data-astro-cid-bi27l4kv>${navItems.map((item) => renderTemplate`<li class="nav-item" data-astro-cid-bi27l4kv><a${addAttribute(withBase(item.href), "href")}${addAttribute(`nav-link ${isActive(item.href) ? "active" : ""}`, "class")}${addAttribute(isActive(item.href) ? "page" : void 0, "aria-current")} data-astro-cid-bi27l4kv>${item.name}</a></li>`)}</ul></nav></div></header>${renderScript($$result, "D:/Kuliah/Magang/template2/src/components/common/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Kuliah/Magang/template2/src/components/common/Header.astro", void 0);
//#endregion
//#region src/components/common/GlassPanel.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$GlassPanel = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$GlassPanel;
	const { variant = "default", padding = "lg", radius = "lg", className = "", as: Element = "div" } = Astro.props;
	const paddingMap = {
		none: "0",
		sm: "var(--space-sm)",
		md: "var(--space-md)",
		lg: "var(--space-lg)",
		xl: "var(--space-xl)"
	};
	const radiusMap = {
		none: "0",
		sm: "var(--radius-sm)",
		md: "var(--radius-md)",
		lg: "var(--radius-lg)",
		xl: "var(--radius-xl)"
	};
	const paddingValue = paddingMap[padding];
	const radiusValue = radiusMap[radius];
	return renderTemplate`${renderComponent($$result, "Element", Element, {
		"class": `glass-panel glass-panel--${variant} ${className}`,
		"style": `--panel-padding: ${paddingValue}; --panel-radius: ${radiusValue};`,
		"data-astro-cid-fkpwst5a": true
	}, { "default": ($$result) => renderTemplate`${renderSlot($$result, $$slots["default"])}` })}`;
}, "D:/Kuliah/Magang/template2/src/components/common/GlassPanel.astro", void 0);
//#endregion
//#region src/components/common/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	const socialIcons = {
		github: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
		twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`,
		linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
		instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
		youtube: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`
	};
	const footerLinks = [
		{
			name: "Privacy",
			href: "/privacy"
		},
		{
			name: "Terms",
			href: "/terms"
		},
		{
			name: "Sitemap",
			href: "/sitemap-index.xml"
		},
		{
			name: "RSS",
			href: "/rss.xml"
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<footer class="site-footer" data-astro-cid-ubon47vl>${renderComponent($$result, "GlassPanel", $$GlassPanel, {
		"variant": "solid",
		"padding": "xl",
		"radius": "none",
		"data-astro-cid-ubon47vl": true
	}, { "default": ($$result) => renderTemplate`<div class="container footer-container" data-astro-cid-ubon47vl><!-- Main Footer Content --><div class="footer-grid" data-astro-cid-ubon47vl><!-- Brand Section --><div class="footer-section" data-astro-cid-ubon47vl><h3 class="footer-title" data-astro-cid-ubon47vl>${siteConfig.name}</h3><p class="footer-description" data-astro-cid-ubon47vl>${siteConfig.description}</p></div><!-- Quick Links --><div class="footer-section" data-astro-cid-ubon47vl><h4 class="footer-subtitle" data-astro-cid-ubon47vl>Quick Links</h4><ul class="footer-links" data-astro-cid-ubon47vl>${siteConfig.nav.main.map((item) => renderTemplate`<li data-astro-cid-ubon47vl><a${addAttribute(withBase(item.href), "href")} class="footer-link" data-astro-cid-ubon47vl>${item.name}</a></li>`)}</ul></div><!-- Resources --><div class="footer-section" data-astro-cid-ubon47vl><h4 class="footer-subtitle" data-astro-cid-ubon47vl>Resources</h4><ul class="footer-links" data-astro-cid-ubon47vl>${footerLinks.map((link) => renderTemplate`<li data-astro-cid-ubon47vl><a${addAttribute(withBase(link.href), "href")} class="footer-link" data-astro-cid-ubon47vl>${link.name}</a></li>`)}</ul></div><!-- Social Links --><div class="footer-section" data-astro-cid-ubon47vl><h4 class="footer-subtitle" data-astro-cid-ubon47vl>Connect</h4><div class="social-links" data-astro-cid-ubon47vl>${Object.entries(siteConfig.social).map(([platform, url]) => url && renderTemplate`<a${addAttribute(url, "href")} class="social-link"${addAttribute(`Follow us on ${platform}`, "aria-label")} target="_blank" rel="noopener noreferrer" data-astro-cid-ubon47vl>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`${unescapeHTML(socialIcons[platform])}` })}</a>`)}</div></div></div><!-- Divider --><div class="glass-divider" data-astro-cid-ubon47vl></div><!-- Bottom Bar --><div class="footer-bottom" data-astro-cid-ubon47vl><p class="copyright" data-astro-cid-ubon47vl>© ${currentYear} ${siteConfig.name}. All rights reserved.</p><p class="credits" data-astro-cid-ubon47vl>Built with <a href="https://astro.build" target="_blank" rel="noopener noreferrer" data-astro-cid-ubon47vl>Astro</a>· Built with Astro by ${siteConfig.social.github ? renderTemplate`<a${addAttribute(siteConfig.social.github, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-ubon47vl>${siteConfig.author}</a>` : siteConfig.author}</p></div></div>` })}</footer>`;
}, "D:/Kuliah/Magang/template2/src/components/common/Footer.astro", void 0);
//#endregion
export { $$GlassPanel as n, $$Header as r, $$Footer as t };
