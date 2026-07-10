import { D as createAstro, O as createComponent, b as addAttribute, m as renderTemplate, o as renderComponent, v as maybeRenderHead } from "./server_C7mqJMxx.mjs";
import { n as $$Picture$1 } from "./_astro_assets_BjRDDCvc.mjs";
import "./compiler_Y7Shd06a.mjs";
//#region src/components/ui/Picture.astro
createAstro("https://your-vercel-domain.vercel.app");
var $$Picture = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Picture;
	const { src, alt, width, height, widths, sizes, loading = "lazy", fetchpriority, class: className } = Astro.props;
	const validAlt = alt && String(alt).trim() ? String(alt).trim() : "Gambar";
	const hasSrc = src !== void 0 && src !== null && (typeof src !== "string" || String(src).trim() !== "");
	return renderTemplate`${hasSrc ? hasSrc && typeof src !== "string" ? renderTemplate`${renderComponent($$result, "AstroPicture", $$Picture$1, {
		"src": src,
		"alt": validAlt,
		"formats": ["avif", "webp"],
		"fallbackFormat": "webp",
		"widths": widths ?? (sizes ? [
			400,
			800,
			1200
		] : void 0),
		"sizes": sizes,
		"loading": loading,
		"fetchpriority": fetchpriority,
		"class": className
	})}` : renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(src, "src")}${addAttribute(validAlt, "alt")}${addAttribute(width, "width")}${addAttribute(height, "height")}${addAttribute(loading, "loading")} decoding="async"${addAttribute(fetchpriority, "fetchpriority")}${addAttribute(className, "class")}>` : renderTemplate`<div${addAttribute(className, "class")} aria-hidden="true"></div>`}`;
}, "C:/ASTRO/template2/src/components/ui/Picture.astro", void 0);
//#endregion
export { $$Picture as t };
