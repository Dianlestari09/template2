import { D as createAstro, O as createComponent, b as addAttribute, m as renderTemplate, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import "./compiler_Y7Shd06a.mjs";
import { t as withBase } from "./url_CGAqnK3O.mjs";
//#region src/components/ui/Tag.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Tag = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Tag;
	const { name, href, size = "md", class: className = "" } = Astro.props;
	name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
	const target = href ? withBase(href) : void 0;
	const classes = [
		"tag",
		`tag--${size}`,
		className
	].filter(Boolean).join(" ");
	return renderTemplate`${target ? renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(classes, "class")}${addAttribute(target, "href")} data-astro-cid-enav3c2u><span class="tag__hash" aria-hidden="true" data-astro-cid-enav3c2u>#</span>${name}</a>` : renderTemplate`<span${addAttribute(classes, "class")} aria-hidden="false" data-astro-cid-enav3c2u><span class="tag__hash" aria-hidden="true" data-astro-cid-enav3c2u>#</span>${name}</span>`}`;
}, "D:/Kuliah/Magang/template2/src/components/ui/Tag.astro", void 0);
//#endregion
export { $$Tag as t };
