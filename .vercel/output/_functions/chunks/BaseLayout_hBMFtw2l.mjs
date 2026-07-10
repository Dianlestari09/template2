import { D as createAstro, O as createComponent, T as unescapeHTML, b as addAttribute, c as Fragment, d as renderSlot, m as renderTemplate, o as renderComponent, r as renderScript, t as defineStyleVars, v as maybeRenderHead, y as renderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { n as siteConfig, t as withBase } from "./url_CGAqnK3O.mjs";
//#region src/components/common/Seo.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Seo = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Seo;
	const { title = siteConfig.title, description = siteConfig.description, ogImage = siteConfig.ogImage, noIndex = false, article } = Astro.props;
	const fullTitle = title === siteConfig.title ? title : `${title} - ${siteConfig.name}`;
	const canonicalURL = new URL(Astro.url.pathname, Astro.site);
	const ogImageURL = new URL(withBase(ogImage), Astro.site).href;
	const jsonLd = article ? {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: title,
		description,
		url: canonicalURL.href,
		image: ogImageURL,
		datePublished: article.publishedTime,
		dateModified: article.modifiedTime ?? article.publishedTime,
		author: {
			"@type": "Person",
			name: article.author ?? siteConfig.author
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.name
		},
		keywords: article.tags?.join(", ")
	} : {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.name,
		description: siteConfig.description,
		url: new URL(withBase("/"), Astro.site).href
	};
	return renderTemplate`<!-- Title & Description --><title>${fullTitle}</title><meta name="description"${addAttribute(description, "content")}><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Open Graph --><meta property="og:type"${addAttribute(article ? "article" : "website", "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:site_name"${addAttribute(siteConfig.name, "content")}><meta property="og:image"${addAttribute(ogImageURL, "content")}><meta property="og:locale" content="en_US"><!-- Article metadata -->${article && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<meta property="article:published_time"${addAttribute(article.publishedTime, "content")}>${article.modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(article.modifiedTime, "content")}>`}${article.author && renderTemplate`<meta property="article:author"${addAttribute(article.author, "content")}>`}${article.tags?.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`)}` })}`}<!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImageURL, "content")}>${siteConfig.twitterHandle && renderTemplate`<meta name="twitter:site"${addAttribute(siteConfig.twitterHandle, "content")}>`}<!-- Robots -->${noIndex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<!-- RSS Feed -->${siteConfig.features.rss && renderTemplate`<link rel="alternate" type="application/rss+xml"${addAttribute(`${siteConfig.name} RSS Feed`, "title")}${addAttribute(withBase("/rss.xml"), "href")}>`}<!-- JSON-LD Structured Data. \`<\` is escaped so a content string containing
     "<\/script>" can't break out of the block (stored-XSS guard). --><script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd).replace(/</g, "\\u003c"))}<\/script>`;
}, "C:/ASTRO/template2/src/components/common/Seo.astro", void 0);
//#endregion
//#region src/components/common/AuroraBackground.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$AuroraBackground = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AuroraBackground;
	const { intensity = "medium", animated = true } = Astro.props;
	const opacity = {
		low: "0.3",
		medium: "0.5",
		high: "0.7"
	}[intensity];
	const $$definedVars = defineStyleVars([{ opacity }]);
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(`aurora-background ${animated ? "aurora-animated" : ""}`, "class")}${addAttribute(intensity, "data-intensity")} aria-hidden="true"${addAttribute($$definedVars, "style")} data-astro-cid-k7vidcjz><div class="aurora-layer aurora-1"${addAttribute($$definedVars, "style")} data-astro-cid-k7vidcjz></div><div class="aurora-layer aurora-2"${addAttribute($$definedVars, "style")} data-astro-cid-k7vidcjz></div><div class="aurora-layer aurora-3"${addAttribute($$definedVars, "style")} data-astro-cid-k7vidcjz></div></div>${renderScript($$result, "C:/ASTRO/template2/src/components/common/AuroraBackground.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/ASTRO/template2/src/components/common/AuroraBackground.astro", void 0);
//#endregion
//#region src/components/common/ThemeToggle.astro
var $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
	const defaultMode = siteConfig.theme.defaultColorMode;
	return renderTemplate`${maybeRenderHead($$result)}<button id="theme-toggle" class="theme-toggle glass-button" type="button" aria-label="Toggle color theme" title="Toggle color theme"${addAttribute(defaultMode, "data-default-mode")} data-astro-cid-7sxyt6bk><svg class="icon icon-sun" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-7sxyt6bk><circle cx="12" cy="12" r="5" data-astro-cid-7sxyt6bk></circle><line x1="12" y1="1" x2="12" y2="3" data-astro-cid-7sxyt6bk></line><line x1="12" y1="21" x2="12" y2="23" data-astro-cid-7sxyt6bk></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" data-astro-cid-7sxyt6bk></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" data-astro-cid-7sxyt6bk></line><line x1="1" y1="12" x2="3" y2="12" data-astro-cid-7sxyt6bk></line><line x1="21" y1="12" x2="23" y2="12" data-astro-cid-7sxyt6bk></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" data-astro-cid-7sxyt6bk></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" data-astro-cid-7sxyt6bk></line></svg><svg class="icon icon-moon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-7sxyt6bk><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" data-astro-cid-7sxyt6bk></path></svg><svg class="icon icon-system" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-7sxyt6bk><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-astro-cid-7sxyt6bk></rect><line x1="8" y1="21" x2="16" y2="21" data-astro-cid-7sxyt6bk></line><line x1="12" y1="17" x2="12" y2="21" data-astro-cid-7sxyt6bk></line></svg></button>${renderScript($$result, "C:/ASTRO/template2/src/components/common/ThemeToggle.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/ASTRO/template2/src/components/common/ThemeToggle.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const props = Astro.props;
	return renderTemplate`<html lang="en" data-astro-cid-z4jru4n3><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="generator"${addAttribute(Astro.generator, "content")}><!-- Favicon & app icons --><link rel="icon" type="image/svg+xml"${addAttribute(withBase("/favicon.svg"), "href")}><link rel="icon" type="image/png" sizes="32x32"${addAttribute(withBase("/favicon-32.png"), "href")}><link rel="icon" type="image/png" sizes="16x16"${addAttribute(withBase("/favicon-16.png"), "href")}><link rel="apple-touch-icon"${addAttribute(withBase("/apple-touch-icon.png"), "href")}><link rel="manifest"${addAttribute(withBase("/manifest.webmanifest"), "href")}><meta id="theme-color-meta" name="theme-color" content="#0b0f19"><!-- SEO: title, description, canonical, Open Graph, Twitter, JSON-LD -->${renderComponent($$result, "Seo", $$Seo, {
		"title": props.title,
		"description": props.description,
		"ogImage": props.ogImage,
		"noIndex": props.noIndex,
		"article": props.article,
		"data-astro-cid-z4jru4n3": true
	})}<!-- Theme Script (FOUC Prevention) --><!--
      Sets two attributes on <html> before first paint:
        data-theme       — the *resolved* appearance ('light' | 'dark'), drives the tokens
        data-theme-mode  — the *selected* preference ('system' | 'light' | 'dark'), drives the toggle icon
      localStorage is wrapped so a throw (Safari "block all cookies", private mode,
      sandboxed iframe) can't abort the script and leave the page unthemed.
    --><script>${unescapeHTML(`(function(){
        var d = document.documentElement;
        function safeGet(k){ try { return localStorage.getItem(k); } catch (e) { return null; } }
        var stored = safeGet('theme');
        var fallback = ${JSON.stringify(siteConfig.theme.defaultColorMode)};
        var mode = (stored === 'light' || stored === 'dark' || stored === 'system') ? stored : fallback;
        if (mode !== 'light' && mode !== 'dark' && mode !== 'system') mode = 'system';
        var resolved = mode;
        if (mode === 'system') {
          var prefersDark = false;
          try { prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) {}
          resolved = prefersDark ? 'dark' : 'light';
        }
        d.setAttribute('data-theme', resolved);
        d.setAttribute('data-theme-mode', mode);
        var meta = document.getElementById('theme-color-meta');
        if (meta) meta.setAttribute('content', resolved === 'dark' ? '#0b0f19' : '#f5f6f9');
      })();`)}<\/script><!-- The theme ships a system-ui font stack (see tokens.css --font-sans),
         so there are no web fonts to preconnect or load. -->${renderHead($$result)}</head><body data-astro-cid-z4jru4n3><!-- Skip to content link --><a href="#main" class="skip-link" data-astro-cid-z4jru4n3>Skip to content</a><!-- Aurora Background -->${renderComponent($$result, "AuroraBackground", $$AuroraBackground, {
		"intensity": "medium",
		"animated": true,
		"data-astro-cid-z4jru4n3": true
	})}<!-- Main Layout -->${renderSlot($$result, $$slots["default"])}<!-- Theme Toggle (can be positioned by parent) -->${siteConfig.theme.showThemeToggle && renderTemplate`<div id="theme-toggle-container" data-astro-cid-z4jru4n3>${renderComponent($$result, "ThemeToggle", $$ThemeToggle, { "data-astro-cid-z4jru4n3": true })}</div>`}</body></html>`;
}, "C:/ASTRO/template2/src/layouts/BaseLayout.astro", void 0);
//#endregion
export { $$BaseLayout as t };
